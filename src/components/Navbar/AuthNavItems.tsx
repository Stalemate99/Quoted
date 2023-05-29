import React from "react";
import { useSetRecoilState } from "recoil";

import { authModalState } from "@/atoms/authModalAtom";

type AuthNavItemsProps = {};

const AuthNavItems: React.FC<AuthNavItemsProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleSignIn = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "signin" }));
  };

  const handleSignUp = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true, type: "signup" }));
  };

  return (
    <div className="flex items-center gap-6 px-4 md:px-8">
      <button
        className="inline-block rounded bg-amber-900 px-5 pb-1 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <button
        className="inline-block rounded bg-amber-900 px-5 pb-1 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};
export default AuthNavItems;
