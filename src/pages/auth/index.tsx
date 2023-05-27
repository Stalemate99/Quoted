import AuthModal from "@/components/Modal/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full">
      <Navbar />
      <AuthModal />
    </div>
  );
};

export default AuthPage;
