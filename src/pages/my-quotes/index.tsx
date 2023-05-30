import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

import Navbar from "@/components/Navbar/Navbar";
import QuoteItem from "@/components/Quote/QuoteItem";
import { auth, firestore } from "@/firebase/config";
import { quoteModalState } from "@/atoms/quoteModalAtom";
import QuoteModal from "@/components/Modal/QuoteModal";

type PersonalQuotesProps = {};
type QuoteProps = {
  author_name: string;
  author_pic: string;
  likes: number;
  quote: string;
  timestamp: Date;
  id: string;
  type?: "edit";
};

const PersonalQuotes: React.FC<PersonalQuotesProps> = () => {
  const [quotes, setQuotes] = useState([]);
  const [user] = useAuthState(auth);
  const quoteModal = useRecoilValue(quoteModalState);

  useEffect(() => {
    if (!user) {
      return;
    }

    console.log(user.displayName);
    const quotesQuery = query(
      collection(firestore, "quotes"),
      where("author_name", "==", user?.displayName),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(quotesQuery, (querySnapshot) => {
      const quoteData = [];

      querySnapshot.forEach((quoteDoc) => {
        quoteData.push({ ...quoteDoc.data(), id: quoteDoc.id });
      });

      setQuotes(quoteData);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const renderQuotes = () => {
    return (
      <>
        {quotes.map((quote: QuoteProps) => {
          return <QuoteItem key={quote.id} {...quote} type="edit" />;
        })}
      </>
    );
  };

  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <section className="flex flex-col items-center gap-2 m-4">
        <h2 className="text-amber-900 font-medium text-2xl">Your Quotes</h2>
        <ul className="flex flex-col gap-4 max-h-[70vh] p-2 w-[90%] lg:w-[50%] pl-4 bg-white rounded-lg items-center overflow-y-scroll">
          {renderQuotes()}
        </ul>
      </section>
      {quoteModal.isOpen ? <QuoteModal /> : null}
    </main>
  );
};
export default PersonalQuotes;
