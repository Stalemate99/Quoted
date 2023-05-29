import Navbar from "@/components/Navbar/Navbar";
import React from "react";

type LeaderboardProps = {};

const Leaderboard: React.FC<LeaderboardProps> = () => {
  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <h1>Learderboard</h1>
    </main>
  );
};
export default Leaderboard;
