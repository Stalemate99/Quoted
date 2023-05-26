import dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Image from "next/image";

function initEnvironmentVariables() {
  dotenv.config();
}

export default function Home() {
  initEnvironmentVariables();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Quoted
    </main>
  );
}
