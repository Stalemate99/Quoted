import React, { FormEvent } from "react";

type ResetPassowrdProps = {};

const ResetPassowrd: React.FC<ResetPassowrdProps> = () => {
  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Reset Password");
  };

  return (
    <form
      onSubmit={handleReset}
      className="flex flex-col gap-2 text-white p-4 items-center"
    >
      <h3 className="text-lg font-medium">Forgot your password?</h3>
      <p className="text-center">
        Enter your email address and we&apos;ll send you an email with
        instructions to reset your password.
      </p>
      <div className="flex flex-col gap-2 my-2 w-full items-start justify-start">
        <label htmlFor="email" className="text-sm font-medium">
          Enter your registered email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="name@domain.org"
          className="flex items-center w-full h-10 text-black outline-none rounded px-2 py-1 focus:border-black focus:border-2"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-block w-48 h-12 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassowrd;
