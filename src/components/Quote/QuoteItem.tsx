/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { quoteModalState } from "@/atoms/quoteModalAtom";
import { firestore } from "@/firebase/config";
import { DEFAULT_TOAST_CONFIG } from "@/utils/toastUtils";

type QuoteItemProps = {
  author_name: string;
  author_pic: string;
  likes: number;
  quote: string;
  timestamp: {
    seconds: number;
  };
  id: string;
  type?: "edit";
};

const QuoteItem: React.FC<QuoteItemProps> = ({
  id,
  quote,
  likes,
  timestamp,
  author_name: authorName,
  author_pic: authorPic,
  type,
}) => {
  const setQuoteModal = useSetRecoilState(quoteModalState);
  const renderTime = () => {
    const time = new Date(1970, 0, 1);
    time.setSeconds(timestamp.seconds);

    return time.toDateString();
  };

  const handleLike = async () => {
    try {
      const quoteRef = doc(firestore, "quotes", id);
      const quoteDoc = await getDoc(quoteRef);

      if (quoteDoc.exists()) {
        const updateLike = await updateDoc(quoteRef, {
          likes: likes + 1,
        });
      }
    } catch (error) {
      toast.error(
        "Error occured while updating. Please try again.",
        DEFAULT_TOAST_CONFIG
      );
    }
  };

  const renderEditButton = () => {
    const handleEditModal = () => {
      setQuoteModal((prevVal) => ({
        ...prevVal,
        isOpen: true,
        type: "edit",
        data: { quote, id },
      }));
    };

    return (
      <button type="button" onClick={handleEditModal} className="">
        <BiEdit className="w-6 h-6" />
      </button>
    );
  };

  return (
    <li
      key={id}
      className="flex gap-2 items-center w-full bg-amber-50 p-2 border-amber-900 border-2 rounded-lg"
    >
      <div className="p-1 min-w-[15%] flex flex-col justify-center items-center">
        {authorPic ? (
          <img
            src={authorPic}
            alt={authorName}
            className="rounded-full w-8 h-8 sm:w-12 sm:h-12"
          />
        ) : (
          <FaUserCircle className="w-12 h-12" />
        )}
        <span className="flex gap-2 items-center mt-2">
          <button
            className="flex items-center text-amber-700 hover:text-pink-400"
            onClick={handleLike}
          >
            <AiFillHeart className="shadow-xl inline" />
          </button>
          <label className="font-medium text-sm">{likes}</label>
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full p-1">
        <span className="flex">
          <p className="w-fit italic font-semibold text-lg text-amber-900 grow">
            {quote}
          </p>
          {type === "edit" ? renderEditButton() : null}
        </span>
        <span className="flex gap-1 items-start">
          <p className="font-medium text-amber-800">{authorName}</p>
          <span className="w-full flex justify-end">
            <p className="text-amber-950 text-sm">{renderTime()}</p>
          </span>
        </span>
      </div>
    </li>
  );
};

export default QuoteItem;
