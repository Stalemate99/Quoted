import { db } from "@/firebase/config";
import { Quote } from "@/types/Quote";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface UpdateQuote {
  likes?: number;
  quote?: string;
  quoteId: string;
}

const addQuote = async (newQuote: Quote) => {
  try {
    await addDoc(collection(db, "quote"), {
      authorId: newQuote.authorId,
      quote: newQuote.quote,
      likes: newQuote.likes || 0,
      createdAt: new Date().getTime(),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateQuote = async (updatedQuote: UpdateQuote) => {
  const { likes, quoteId, quote } = updatedQuote;

  try {
    const quoteRef = doc(db, "quote", quoteId);
    await updateDoc(quoteRef, {
      likes,
      quote,
    });
  } catch (error) {
    console.log(error);
  }
};

const removeQuote = async (quoteId: string) => {
  try {
    const quoteRef = doc(db, "quote", quoteId);
    await deleteDoc(quoteRef);
  } catch (error) {
    console.log(error);
  }
};

export { addQuote, removeQuote, updateQuote };
