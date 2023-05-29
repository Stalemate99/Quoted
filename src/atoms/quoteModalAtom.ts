import { atom } from "recoil";

type QuoteModalState = {
  isOpen: boolean;
  type: "add" | "edit";
};

const initialQuoteModalState: QuoteModalState = {
  isOpen: false,
  type: "add",
};

export const quoteModalState = atom({
  key: "quoteModalState",
  default: initialQuoteModalState,
});
