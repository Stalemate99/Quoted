import { quoteModalState } from "@/atoms/quoteModalAtom";
import { firestore } from "@/firebase/config";
import { DEFAULT_TOAST_CONFIG } from "@/utils/toastUtils";
import { updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";

type EditQuoteModalProps = {};

const EditQuoteModal: React.FC<EditQuoteModalProps> = () => {
  const quoteModal = useRecoilValue(quoteModalState);
  const setQuoteModal = useSetRecoilState(quoteModalState);
  const [quote, setQuote] = useState(() => quoteModal.data?.quote);

  const handleQuoteUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const quoteRef = await doc(
        firestore,
        "quotes",
        quoteModal.data?.id || ""
      );

      if (quoteModal.data?.quote !== quote) {
        const isUpdateSuccess = await updateDoc(quoteRef, {
          quote,
        });

        toast.success("Updated your quote.", DEFAULT_TOAST_CONFIG);
      }

      setQuoteModal((prevVal) => ({
        ...prevVal,
        isOpen: false,
        type: "add",
        data: undefined,
      }));
    } catch (error) {
      toast.error(
        "Error occured while saving quote changes.",
        DEFAULT_TOAST_CONFIG
      );
    }
  };
  return (
    <form
      onSubmit={handleQuoteUpdate}
      className="flex flex-col items-start w-full gap-4"
    >
      <label htmlFor="quote" className="font-medium text-lg text-amber-900">
        You can edit perfection
      </label>
      <textarea
        id="quote"
        name="quote"
        placeholder="Enter thee quote"
        defaultValue={quote}
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
          disabled={!quote?.length}
          className="inline-block w-fit h-10 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
        >
          Submit
        </button>
      </span>
    </form>
  );
};

export default EditQuoteModal;
