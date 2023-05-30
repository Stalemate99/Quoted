import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

import { quoteModalState } from "@/atoms/quoteModalAtom";
import Navbar from "@/components/Navbar/Navbar";
import GlobalQuote from "@/components/Quote/GlobalQuote";
import QuoteModal from "@/components/Modal/QuoteModal";
import { auth } from "@/firebase/config";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const quoteModal = useRecoilValue(quoteModalState);
  const setQuoteModal = useSetRecoilState(quoteModalState);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) setSignedIn(true);
    else {
      setSignedIn(false);
      router.push("/auth");
    }
  }, [user, router]);

  const renderContent = () => {
    return (
      <>
        <GlobalQuote />
        <span className="absolute p-2 bottom-0 right-0">
          <button
            type="button"
            onClick={() =>
              setQuoteModal((prev) => ({
                ...prev,
                isOpen: true,
                type: "add",
              }))
            }
            className="flex items-center justify-center rounded-[50%] w-12 h-12 bg-amber-900 text-white"
          >
            <AiFillPlusCircle className="w-10 h-10" />
          </button>
        </span>
        {quoteModal.isOpen ? <QuoteModal /> : null}
      </>
    );
  };

  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      {isSignedIn ? renderContent() : null}
    </main>
  );
};

export default Home;
