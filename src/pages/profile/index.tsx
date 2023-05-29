import React from "react";

import Navbar from "@/components/Navbar/Navbar";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <h1>Profile</h1>
    </main>
  );
};

export default Profile;
