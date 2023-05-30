import React from "react";
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
  const quoteModal = useRecoilValue(quoteModalState);
  const setQuoteModal = useSetRecoilState(quoteModalState);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const renderContent = () => {
    if (user) {
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
    }

    router.push("/auth");
  };

  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      {renderContent()}
    </main>
  );
};

export default Home;
