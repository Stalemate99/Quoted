import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { quoteModalState } from "@/atoms/quoteModalAtom";
import AddQuoteModal from "./AddQuoteModal";
import EditQuoteModal from "./EditQuoteModal";

type QuoteModalProps = {};

const QuoteModal: React.FC<QuoteModalProps> = () => {
  const quoteModal = useRecoilValue(quoteModalState);
  const handleModalClose = useCloseModal();

  return (
    <>
      <div
        id="outer-bg"
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
      ></div>
      <section className="absolute flex flex-col m-auto w-[90%] sm:w-[40%] lg:w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-amber-600 rounded-md">
        <button
          className="w-10 m-2 text-center bg-transparent rounded-lg shadow relative font-medium text-md p-2 ml-auto inline-flex items-center hover:bg-amber-900 hover:border-2 hover:border-white text-white border-2 border-transparent"
          onClick={handleModalClose}
        >
          <IoClose className="h-5 w-5 bg-transparent" />
        </button>
        <section className="flex w-full justify-start p-4">
          {quoteModal.type === "add" ? (
            <AddQuoteModal />
          ) : quoteModal.type === "edit" ? (
            <EditQuoteModal />
          ) : null}
        </section>
      </section>
    </>
  );
};

export default QuoteModal;

function useCloseModal() {
  const setQuoteModal = useSetRecoilState(quoteModalState);

  const handleModalClose = () => {
    setQuoteModal((prev) => ({ ...prev, isOpen: false, type: "add" }));
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleModalClose();
    };

    const handleOuterClick = (event: MouseEvent) => {
      const outerDiv = document.getElementById("outer-bg");

      if (event.target instanceof Node) {
        if (outerDiv?.contains(event.target)) handleModalClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("mousedown", handleOuterClick);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("mousedown", handleOuterClick);
    };
  });

  return handleModalClose;
}
