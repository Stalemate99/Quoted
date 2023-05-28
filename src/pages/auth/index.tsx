/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRecoilValue } from "recoil";

import AuthModal from "@/components/Modal/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { authModalState } from "@/atoms/authModalAtom";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);

  return (
    <div className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <div className="flex w-full justify-center mt-8">
        <img
          src="/scroll.svg"
          alt="scroll_background"
          // className="sm:rotate-90 w-[80%] h-[30%]"
        />
      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};

export default AuthPage;
