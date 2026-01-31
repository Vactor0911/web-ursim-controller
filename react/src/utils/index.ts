/**
 * 단위에 따라 값을 포맷팅하는 함수
 * @param value 값
 * @param unit 단위
 * @returns 포맷팅된 값
 */
export const formatUnitValue = (value: number, unit: string) => {
  switch (unit) {
    case "m":
      return Number(value.toFixed(2));
    case "inch":
      return Number((value * 39.3701).toFixed(4));
    case "rad":
      return Number(value.toFixed(3));
    case "deg":
      return Number((value * 57.2958).toFixed(2));
    default:
      return value;
  }
};
