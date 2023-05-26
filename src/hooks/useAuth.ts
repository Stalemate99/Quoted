import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Author } from "@/types/Author";

const useAuth = () => {
  const [author, setAuthor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((author) => {
      console.log(author, "Author Content");
      setIsLoggedIn(author && author.uid ? true : false);
      setAuthor(author);
    });
  });
  return { author, isLoggedIn };
};

export default useAuth;
