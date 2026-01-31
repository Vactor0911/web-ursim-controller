import { atom } from "jotai";

/**
 * 메뉴 상태
 */
export const Menu = {
  Button: 0,
  Joystick: 1,
} as const;
export type Menu = (typeof Menu)[keyof typeof Menu];

export const menuAtom = atom<Menu>(Menu.Button);
