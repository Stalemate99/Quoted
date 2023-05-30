import React, { useState } from "react";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import { DEFAULT_TOAST_CONFIG } from "@/utils/toastUtils";
import { auth, firestore } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { quoteModalState } from "@/atoms/quoteModalAtom";

type AddQuoteModalProps = {};

const AddQuoteModal: React.FC<AddQuoteModalProps> = () => {
  const [quote, setQuote] = useState("");
  const [user] = useAuthState(auth);
  const setQuoteModal = useSetRecoilState(quoteModalState);

  const handleQuoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const quoteRef = await addDoc(collection(firestore, "quotes"), {
        quote,
        author_name: user?.displayName,
        author_pic: user?.photoURL,
        likes: 0,
        timestamp: Timestamp.now(),
      });

      if (!quoteRef.id) {
        toast.error("Failed to submit quote", DEFAULT_TOAST_CONFIG);
        return;
      }

      toast.success("Added your quote", DEFAULT_TOAST_CONFIG);
      setQuoteModal((prev) => ({ ...prev, isOpen: false, type: "add" }));
    } catch (error: any) {
      toast.error("Error occured while submitting quote", DEFAULT_TOAST_CONFIG);
    }
  };

  return (
    <form
      onSubmit={handleQuoteSubmit}
      className="flex flex-col items-start w-full gap-4"
    >
      <label htmlFor="quote" className="font-medium text-lg text-amber-900">
        Inspire us with a quote.
      </label>
      <textarea
        id="quote"
        name="quote"
        placeholder="Enter thee quote"
        rows={4}
        wrap="hard"
        className="resize-none rounded-md bg-amber-100 text-black p-1 px-2 w-full"
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setQuote(event.target.value)
        }
        required
      ></textarea>

      <span className="flex w-full justify-center">
        <button
          type="submit"
          disabled={!quote.length}
          className="inline-block w-fit h-10 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
        >
          Submit
        </button>
      </span>
    </form>
  );
};

export default AddQuoteModal;
