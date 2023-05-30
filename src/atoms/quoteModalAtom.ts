import { atom } from "recoil";

type QuoteModalState = {
  isOpen: boolean;
  type: "add" | "edit";
  data?: {
    quote: string;
    id: string;
  };
};

const initialQuoteModalState: QuoteModalState = {
  isOpen: false,
  type: "add",
  data: undefined,
};

export const quoteModalState = atom({
  key: "quoteModalState",
  default: initialQuoteModalState,
});
