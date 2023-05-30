import React from "react";
import Link from "next/link";

import Search from "../Search/Search";
import Profile from "../Profile/Profile";

type MainNavItemsProps = {};

const MainNavItems: React.FC<MainNavItemsProps> = () => {
  return (
    <div className="flex items-center gap-6 px-4 md:px-8">
      {/* TODO Implement search feature for quotes */}
      {/* <Search /> */}
      <Link
        href="/leaderboard"
        className="text-amber-900 font-medium hover:underline"
      >
        Leaderboard
      </Link>
      <Profile />
    </div>
  );
};
export default MainNavItems;
