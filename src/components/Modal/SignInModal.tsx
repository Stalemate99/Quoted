import React, { FormEvent } from "react";

type SignInModalProps = {};

const SignInModal: React.FC<SignInModalProps> = () => {
  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("sign in");
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="flex flex-col gap-2 text-white items-center w-full"
    >
      <span className="flex flex-col gap-4 w-[90%] my-2">
        <label htmlFor="email" className="font-medium text-lg">
          Enter Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="flex items-center w-full h-10 text-black outline-none rounded px-2 py-1 focus:border-black focus:border-2"
          placeholder="email@org.domain"
          required
        />
      </span>

      <span className="flex flex-col gap-4 w-[90%] my-2">
        <label htmlFor="passowrd" className="font-medium text-lg">
          Enter Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="flex items-center w-full h-10 text-black outline-none rounded px-2 py-1 focus:border-black focus:border-2"
          placeholder="********"
          required
        />
        <button type="button" className="flex justify-start">
          <a
            href="#"
            className="text-sm block text-amber-900 hover:text-amber-950 hover:underline"
          >
            Forgot Password?
          </a>
        </button>
      </span>

      <span className="flex flex-col gap-4 items-center w-full pl-6 my-2">
        <button
          type="submit"
          className="inline-block w-32 h-12 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
        >
          Sign In
        </button>

        <section className="flex justify-start gap-2 w-full text-sm font-medium text-amber-900">
          <p>Not Registered?</p>
          <a href="#" className="hover:underline">
            Create Account
          </a>
        </section>
      </span>
    </form>
  );
};

export default SignInModal;
