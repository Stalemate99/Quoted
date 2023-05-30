/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { auth } from "@/firebase/config";
import { DEFAULT_TOAST_CONFIG } from "@/utils/toastUtils";
import { authModalState } from "@/atoms/authModalAtom";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [isActive, setActive] = useState(false);
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const profileNavItemRef = useRef(null);

  const BASE_STYLES =
    "absolute flex top-[120%] left-[-120%] w-32 rounded-lg p-2 bg-amber-800";
  const HIDDEN_STYLES = "hidden " + BASE_STYLES;

  useEffect(() => {
    const handleOuterClick = (event: MouseEvent) => {
      if (event.target instanceof Node) {
        if (!profileNavItemRef.current?.contains(event.target))
          setActive(false);
      }
    };

    window.addEventListener("mousedown", handleOuterClick);

    return () => {
      window.removeEventListener("mousedown", handleOuterClick);
    };
  });

  const handleSignOut = async () => {
    try {
      const isSignedOut = await signOut();

      if (isSignedOut) {
        toast.success("Signed out.", DEFAULT_TOAST_CONFIG);
        setAuthModalState((prevVal) => ({
          ...prevVal,
          isOpen: false,
          type: "signin",
        }));
        router.push("/auth");
      }
    } catch (error: any) {
      toast.error("Unable to sign out. Try again.", DEFAULT_TOAST_CONFIG);
    }
  };

  return (
    <>
      <div
        className="relative flex rounded-full items-center cursor-pointer"
        onClick={() => setActive(!isActive)}
      >
        <img
          src={!!user.photoURL ? user.photoURL : "./profile_pic.png"}
          alt="Default Profile Picture"
          className="rounded-full border-amber-900 border-2 w-14"
        />
        <div
          className={isActive ? BASE_STYLES : HIDDEN_STYLES}
          ref={profileNavItemRef}
        >
          <ul className="flex flex-col gap-2 text-white p-2 items-start justify-center">
            <Link href="/my-quotes">Your Quotes</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={handleSignOut}>Log out</button>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Profile;
