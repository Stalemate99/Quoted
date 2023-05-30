import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import Navbar from "@/components/Navbar/Navbar";
import QuoteItem from "@/components/Quote/QuoteItem";
import { firestore } from "@/firebase/config";

type LeaderboardProps = {};
type QuoteProps = {
  author_name: string;
  author_pic: string;
  likes: number;
  quote: string;
  timestamp: {
    seconds: number;
  };
  id: string;
  type?: "edit";
};

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [quotes, setQuotes] = useState<QuoteProps[]>([]);
  const quotesQuery = query(
    collection(firestore, "quotes"),
    orderBy("likes", "desc"),
    limit(10)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(quotesQuery, (querySnapshot) => {
      const quoteData: QuoteProps[] = [];

      querySnapshot.forEach((quoteDoc) => {
        const { author_name, author_pic, quote, likes, timestamp } =
          quoteDoc.data();
        quoteData.push({
          author_name,
          author_pic,
          quote,
          timestamp,
          likes,
          id: quoteDoc.id,
        });
      });

      setQuotes(quoteData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const renderQuotes = () => {
    return (
      <>
        {quotes.map((quote: QuoteProps) => {
          return <QuoteItem key={quote.id} {...quote} />;
        })}
      </>
    );
  };

  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <section className="flex flex-col items-center gap-2 m-4">
        <h2 className="text-amber-900 font-medium text-2xl">Leaderboard</h2>
        <ul className="flex flex-col gap-4 max-h-[70vh] p-2 w-[90%] lg:w-[50%] pl-4 bg-white rounded-lg items-center overflow-y-scroll">
          {renderQuotes()}
        </ul>
      </section>
    </main>
  );
};
export default Leaderboard;
