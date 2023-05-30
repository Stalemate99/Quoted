import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { firestore } from "@/firebase/config";
import QuoteItem from "./QuoteItem";

type GlobalQuoteProps = {};
type QuoteProps = {
  author_name: string;
  author_pic: string;
  likes: number;
  quote: string;
  timestamp: Date;
  id: string;
};

const GlobalQuote: React.FC<GlobalQuoteProps> = () => {
  const [quotes, setQuotes] = useState([]);
  const quotesQuery = query(
    collection(firestore, "quotes"),
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
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
    <section className="flex flex-col items-center gap-2 m-4">
      <h2 className="text-amber-900 font-medium text-2xl">Recent Quotes</h2>
      <ul className="flex flex-col gap-4 max-h-[70vh] p-2 w-[90%] lg:w-[50%] pl-4 bg-white rounded-lg items-center overflow-y-scroll">
        {renderQuotes()}
      </ul>
    </section>
  );
};

export default GlobalQuote;
