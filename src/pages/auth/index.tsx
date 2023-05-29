/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import AuthModal from "@/components/Modal/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/config";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading] = useAuthState(auth);
  const [isPageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log(user, loading, "Test");
    if (user) router.push("/");
    if (!user || !loading) setPageLoading(false);
  }, [user, router, loading]);

  // TODO Add loader to ensure white screen is not visible
  if (isPageLoading) return null;

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
