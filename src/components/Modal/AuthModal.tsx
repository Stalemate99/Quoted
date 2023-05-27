import React from "react";
import { IoClose } from "react-icons/io5";

import SignInModal from "./SignInModal";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        content=" "
      ></div>
      <div className="relative flex items-center justify-center w-[50%] h-[50%] rounded-lg">
        <section className="absolute flex flex-col m-auto w-full top-[50%] left-[50%]  items-center justify-center bg-gradient-to-b from-amber-900 to-amber-600 rounded-md">
          <button className="w-8 text-center bg-transparent rounded-lg shadow relative font-medium text-md p-2 ml-auto inline-flex items-center hover:bg-amber-900 hover:border-2 hover:border-white text-white border-2 border-transparent">
            <IoClose className="h-5 w-5" />
          </button>
          <br></br>
          <section className="flex">
            <SignInModal />
          </section>
        </section>
      </div>
    </>
  );
};
export default AuthModal;
