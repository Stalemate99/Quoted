import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IoClose } from "react-icons/io5";

import { authModalState } from "@/atoms/authModalAtom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import ResetPassowrd from "./ResetPassowrd";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(authModalState);
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
        <section className="flex items-center justify-center w-[90%]">
          {authModal.type === "signin" ? (
            <SignInModal />
          ) : authModal.type === "signup" ? (
            <SignUpModal />
          ) : authModal.type === "forgotPassword" ? (
            <ResetPassowrd />
          ) : null}
        </section>
      </section>
    </>
  );
};

export default AuthModal;

function useCloseModal() {
  const setAuthModal = useSetRecoilState(authModalState);

  const handleModalClose = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "signin" }));
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
