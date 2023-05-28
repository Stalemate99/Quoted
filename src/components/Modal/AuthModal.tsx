import React from "react";
import { IoClose } from "react-icons/io5";

import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import ResetPassowrd from "./ResetPassowrd";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"></div>
      <section className="absolute flex flex-col m-auto w-[90%] sm:w-[40%] lg:w-[30%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center justify-center bg-amber-600 rounded-md">
        <button className="w-10 m-2 text-center bg-transparent rounded-lg shadow relative font-medium text-md p-2 ml-auto inline-flex items-center hover:bg-amber-900 hover:border-2 hover:border-white text-white border-2 border-transparent">
          <IoClose className="h-5 w-5 bg-transparent" />
        </button>
        <section className="flex items-center justify-center w-[90%]">
          {/* <SignInModal /> */}
          {/* <SignUpModal /> */}
          <ResetPassowrd />
        </section>
      </section>
    </>
  );
};
export default AuthModal;
