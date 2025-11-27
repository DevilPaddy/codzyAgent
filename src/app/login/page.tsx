"use client";
import Image from "next/image";
import AuthButtons from "../../../components/AuthButton/AuthButton";

export default function LoginPage() {
  return (
    <div className="flex m-2 min-h-screen md:flex-row flex-col items-center justify-center bg-white">
      <div className="login-img">
        <Image
        src={'/login.jpg'}
        alt="loginpic"
        width={0}
        height={0}
        sizes="100vh"
        className="w-[20em]"
         />
      </div>

      <div className="w-full max-w-md rounded-lg bg-white p-8 border-[.8px] border-zinc-500">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Login in to <span className="nav-title">Codzy</span>
        </h2>

        <div className="flex flex-col gap-4">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}