import React from "react";

import Navbar from "@/components/Navbar/Navbar";

type PersonalQuotesProps = {};

const PersonalQuotes: React.FC<PersonalQuotesProps> = () => {
  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <h1>Your Quotes</h1>
    </main>
  );
};

export default PersonalQuotes;
