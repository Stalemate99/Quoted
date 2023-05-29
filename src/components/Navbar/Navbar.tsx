/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

import { auth } from "@/firebase/config";
import MainNavItems from "./MainNavItems";
import AuthNavItems from "./AuthNavItems";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);
  const [isAuthActive, setAuthActive] = useState(true);

  useEffect(() => {
    if (user) setAuthActive(false);
    else setAuthActive(true);
  }, [user]);

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex h-16 items-center md:h-20">
        <img
          src={"./logo.svg"}
          alt="Quoted Logo"
          className="h-full px-2 pt-2 md:max-w-lg md:px-4"
        />
      </Link>

      {isAuthActive ? <AuthNavItems /> : <MainNavItems />}
    </div>
  );
};
export default Navbar;
