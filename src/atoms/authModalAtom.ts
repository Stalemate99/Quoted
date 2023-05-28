import { atom } from "recoil";

type AuthModalState = {
  isOpen: boolean;
  type: "signin" | "signup" | "forgotPassword";
};

const initialAuthModalState: AuthModalState = {
  isOpen: false,
  type: "signin",
};

export const authModalState = atom({
  key: "authModalState",
  default: initialAuthModalState,
});
