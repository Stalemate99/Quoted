import React from "react";

import Navbar from "@/components/Navbar/Navbar";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
    </main>
  );
};

export default Home;
