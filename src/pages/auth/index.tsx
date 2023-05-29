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
      <div className="flex w-full h-[40%] justify-center mt-32">
        <div
          id="parchment"
          className="w-[90%] md:w-[50%] h-fit flex rounded-lg"
        >
          <blockquote className="flex p-4 items-center gap-4">
            <span className="font-serif text-8xl font-bold align-top h-fit">
              &lsquo;
            </span>
            <span className="text-amber-950 italic text-lg p-2 text-center">
              Quoted is the perfect place for authors to maintain and vote on
              their favorite quotes. With our platform, you can easily add new
              quotes, edit existing ones, and vote on the ones you like the
              best.
            </span>
            <span className="font-serif text-8xl font-bold align-bottom h-0">
              &rsquo;
            </span>
          </blockquote>
        </div>
      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};

export default AuthPage;
