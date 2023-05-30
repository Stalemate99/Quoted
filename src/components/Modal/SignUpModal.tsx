import React, { FormEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/config";
import { DEFAULT_TOAST_CONFIG } from "@/utils/toastUtils";

import { SIGN_UP_INITIAL_FORM_DATA } from "./constants";

type SignUpModalProps = {};

const SignUpModal: React.FC<SignUpModalProps> = () => {
  const setAuthState = useSetRecoilState(authModalState);
  const [formData, setFormData] = useState(SIGN_UP_INITIAL_FORM_DATA);
  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const router = useRouter();

  const handleSignIn = () => {
    setAuthState((prev) => ({ ...prev, type: "signin" }));
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validating form data
    // Checks password for the following conditions,
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

    // Checks for basic email validation
    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Check for single worded user name
    const nameCheck = /^[A-Za-z0-9_]+$/;

    if (!formData.email.match(emailCheck)) {
      toast.error("Please enter a valid email address.", DEFAULT_TOAST_CONFIG);
      setFormData(SIGN_UP_INITIAL_FORM_DATA);

      return;
    }

    if (!formData.displayName.match(nameCheck)) {
      toast.error(
        "Please enter one word. Only '_' is allowed.",
        DEFAULT_TOAST_CONFIG
      );
      setFormData(SIGN_UP_INITIAL_FORM_DATA);

      return;
    }

    if (!formData.password.match(passwordCheck)) {
      toast.error(
        "Minimum eight characters, at least one letter, one number and one special character required",
        DEFAULT_TOAST_CONFIG
      );
      setFormData(SIGN_UP_INITIAL_FORM_DATA);

      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      if (!newUser) return;
      // Updating the user name after successful creation of account
      const isDisplayUpdated = await updateProfile({
        displayName: formData.displayName,
      });
      if (!isDisplayUpdated)
        toast.error("Unable to update display name.", DEFAULT_TOAST_CONFIG);

      router.push("/");
    } catch (error: any) {
      toast.error(error?.message, DEFAULT_TOAST_CONFIG);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevVal) => ({
      ...prevVal,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-4 text-white items-center w-full"
    >
      <span className="flex flex-col gap-4 w-[90%] my-2">
        <label htmlFor="email" className="font-medium text-lg">
          Enter Email
        </label>
        <input
          onChange={handleFormChange}
          id="email"
          type="email"
          name="email"
          className="flex items-center w-full h-10 text-black outline-none rounded px-2 py-1 focus:border-black focus:border-2"
          placeholder="email@org.domain"
          required
        />
      </span>

      <span className="flex flex-col gap-4 w-[90%] my-2">
        <label htmlFor="name" className="font-medium text-lg">
          Enter Display Name
        </label>
        <input
          onChange={handleFormChange}
          id="name"
          type="text"
          name="displayName"
          className="flex items-center w-full h-10 text-black outline-none rounded px-2 py-1 focus:border-black focus:border-2"
          placeholder="Your name"
          required
        />
      </span>

      <span className="flex flex-col gap-4 w-[90%] my-2">
        <label htmlFor="passowrd" className="font-medium text-lg">
          Enter Password
        </label>
        <input
          onChange={handleFormChange}
          id="password"
          type="password"
          name="password"
          className="flex items-center w-full h-10 text-black outline-none rounded px-2 py-1 focus:border-black focus:border-2"
          placeholder="********"
          required
        />
      </span>

      <span className="flex flex-col gap-4 items-center mb-4 w-full pl-6 my-2">
        <button
          type="submit"
          disabled={!!loading}
          className="inline-block w-32 h-12 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
        >
          Register
        </button>

        <section className="flex justify-start gap-2 w-full text-sm font-medium text-amber-900">
          <p>Already have an account?</p>
          <a href="#" className="hover:underline" onClick={handleSignIn}>
            Log In
          </a>
        </section>
      </span>
    </form>
  );
};
export default SignUpModal;
