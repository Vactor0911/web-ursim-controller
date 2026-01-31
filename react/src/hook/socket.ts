import { useAtomValue, useSetAtom } from "jotai";
import { robotAtom, robotDataAtom } from "../states";
import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const setRobotData = useSetAtom(robotDataAtom);
  const socketRef = useRef<Socket | null>(null);
  const robot = useAtomValue(robotAtom);

  // 소켓 연결 함수
  const connect = useCallback(() => {
    if (socketRef.current && socketRef.current.connected) return;
    console.log("Socket.IO 연결 시도 중...");
    const socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✓ Socket.IO 연결 성공 (ID:", socket.id, ")");
      setConnected(true);
    });
    socket.on("connecting", () => {
      console.log("연결 시도 중...");
    });
    socket.on("reconnect_attempt", (attemptNumber) => {
      console.log(`재연결 시도 중... (${attemptNumber}번째)`);
    });
    socket.on("reconnect", (attemptNumber) => {
      console.log(`✓ 재연결 성공! (${attemptNumber}번째 시도)`);
      setConnected(true);
    });
    socket.on("reconnect_failed", () => {
      console.error("재연결 실패. 최대 시도 횟수 초과.");
      setConnected(false);
    });
    socket.on("robot_data", (data) => {
      setRobotData(data);

      // 축 각도 업데이트
      if (robot && data.joints) {
        robot.joints.shoulder_pan_joint.setJointValue(data.joints.base);
        robot.joints.shoulder_lift_joint.setJointValue(data.joints.shoulder);
        robot.joints.elbow_joint.setJointValue(data.joints.elbow);
        robot.joints.wrist_1_joint.setJointValue(data.joints.wrist1);
        robot.joints.wrist_2_joint.setJointValue(data.joints.wrist2);
        robot.joints.wrist_3_joint.setJointValue(data.joints.wrist3);
      }
    });
    socket.on("status", (message) => {
      console.log("상태:", message);
    });
    socket.on("error_message", (message) => {
      console.error("에러:", message);
    });
    socket.on("connect_error", (error) => {
      console.error("연결 오류:", error.message);
      setConnected(false);
    });
    socket.on("disconnect", (reason) => {
      console.log("Socket.IO 연결 종료. 이유:", reason);
      setConnected(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
  }, [robot, setRobotData]);

  // 페이지 렌더 시 자동 연결
  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        console.log("Socket.IO 연결 해제 중...");
        socketRef.current.off("connect");
        socketRef.current.off("connecting");
        socketRef.current.off("reconnect_attempt");
        socketRef.current.off("reconnect");
        socketRef.current.off("reconnect_failed");
        socketRef.current.off("robot_data");
        socketRef.current.off("status");
        socketRef.current.off("error_message");
        socketRef.current.off("connect_error");
        socketRef.current.off("disconnect");
        socketRef.current.close();
      }
    };
  }, [connect]);

  // 연결 해제
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log("연결 해제 중...");
      socketRef.current.disconnect();
      setConnected(false);
    }
  }, []);

  // 이벤트 전송
  const sendCommand = useCallback((event: string, data?: unknown) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
      console.log(`이벤트 전송: ${event}`, data);
    } else {
      console.warn("Socket.IO가 연결되어 있지 않습니다.");
    }
  }, []);

  return {
    sendCommand,
    connect,
    disconnect,
    connected,
  };
};
