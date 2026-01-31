import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import net from "net";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Vite 기본 포트
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

const UR_HOST = "localhost"; // UR Robot IP
const UR_PORT = 30003;

io.on("connection", (socket) => {
  console.log("✓ Client connected via Socket.IO:", socket.id);

  // UR Robot TCP 연결
  const urSocket = new net.Socket();
  let buffer = Buffer.alloc(0); // 패킷 분할 처리용 버퍼

  urSocket.connect(UR_PORT, UR_HOST, () => {
    console.log("Connected to UR Robot");
    socket.emit("status", "Connected to UR Robot");
  });

  // UR Robot에서 데이터 수신
  urSocket.on("data", (chunk: Buffer) => {
    try {
      // 버퍼에 데이터 추가
      buffer = Buffer.concat([buffer, chunk]);

      // 완전한 패킷이 있는지 확인
      while (buffer.length >= 4) {
        const messageSize = buffer.readInt32BE(0);

        // 완전한 패킷이 도착했는지 확인
        if (buffer.length >= messageSize) {
          const packet = buffer.subarray(0, messageSize);
          buffer = buffer.subarray(messageSize); // 남은 데이터

          // 패킷 파싱
          parseURPacket(packet, socket);
        } else {
          // 아직 완전한 패킷이 아님
          break;
        }
      }
    } catch (error) {
      console.error("UR 데이터 파싱 중 오류 발생:", error);
    }
  });

  urSocket.on("error", (err) => {
    console.error("UR 소켓 오류:", err);
  });

  urSocket.on("close", () => {
    console.log("UR 소켓이 닫혔습니다");

    // 5초 후 재연결 시도
    setTimeout(() => {
      if (socket.connected) {
        console.log("UR 소켓에 재연결을 시도합니다...");
        urSocket.connect(UR_PORT, UR_HOST);
      }
    }, 5000);
  });

  // Socket.IO 클라이언트 연결 해제
  socket.on("disconnect", (reason) => {
    console.log("Socket.IO 연결 종료:", socket.id, "이유:", reason);
    urSocket.destroy();
  });

  // Socket.IO 에러
  socket.on("error", (err) => {
    console.error("Socket.IO 에러:", err);
    urSocket.destroy();
  });

  // 클라이언트로부터 메시지 수신
  socket.on("message", (message: string) => {
    if (urSocket && !urSocket.destroyed) {
      urSocket.write(message);
    }
  });
});

// UR 패킷 파싱 함수
function parseURPacket(data: Buffer, socket: any) {
  if (data.length < 1220) {
    console.warn("패킷 크기 너무 작습니다:", data.length);
    return;
  }

  // Time 파싱 (offset 4-12)
  const time = data.readDoubleBE(4);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  // Tool vector actual 파싱 (offset: 4 + 8 + 48*9 = 444)
  const toolOffset = 444;
  const x = data.readDoubleBE(toolOffset);
  const y = data.readDoubleBE(toolOffset + 8);
  const z = data.readDoubleBE(toolOffset + 16);
  const rx = data.readDoubleBE(toolOffset + 24);
  const ry = data.readDoubleBE(toolOffset + 32);
  const rz = data.readDoubleBE(toolOffset + 40);

  // Robot 데이터 객체 생성
  const robotData = {
    type: "robot_data",
    timestamp: new Date().toISOString(),
    uptime: {
      hours,
      minutes,
      seconds,
    },
    position: {
      x,
      y,
      z,
    },
    rotation: {
      rx,
      ry,
      rz,
    },
  };

  // Socket.IO로 전송 (자동 JSON 직렬화)
  socket.emit("robot_data", robotData);
}

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`UR Robot Socket.IO 프록시가 포트 ${PORT}에서 실행 중입니다.`);
});
