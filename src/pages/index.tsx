import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";

import Navbar from "@/components/Navbar/Navbar";
import GlobalQuote from "@/components/Quote/GlobalQuote";
import QuoteModal from "@/components/Modal/QuoteModal";
import { auth } from "@/firebase/config";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { quoteModalState } from "@/atoms/quoteModalAtom";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const quoteModal = useRecoilValue(quoteModalState);
  const setQuoteModal = useSetRecoilState(quoteModalState);
  const [user] = useAuthState(auth);

  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <GlobalQuote />
      <button
        type="button"
        onClick={() =>
          setQuoteModal((prev) => ({ ...prev, isOpen: true, type: "add" }))
        }
        className="flex items-center justify-center rounded-[50%] w-12 h-12 bg-amber-900 text-white"
      >
        <AiFillPlusCircle className="w-10 h-10" />
      </button>
      {quoteModal.isOpen ? <QuoteModal /> : null}
    </main>
  );
};

export default Home;
