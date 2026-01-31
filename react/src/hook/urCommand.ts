import { useSetAtom } from "jotai";
import { tcpDataAtom } from "../states";

export const useCommand = () => {
  const setTcpData = useSetAtom(tcpDataAtom);

  /**
   * 로봇 제어 명령 전송
   * @param axis 조작 축
   * @param direction 조작 방향
   * @param speed 조작 속도
   */
  const sendCommand = (axis: string, direction: number, speed = 0.05) => {
    setTcpData((prev) => ({
      ...prev,
      [axis]: direction * speed,
    }));
  };

  return { sendCommand };
};
