"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
const AppBar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
        <span className="hover:text-yellow-400 transition-colors">
          <Link href="/">Blink</Link>
        </span>
      </div>
      <div>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <button className="bg-transparent mr-2 hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton forceRedirectUrl="/dashboard">
            <button className="bg-transparent hover:bg-green-500 text-green-400 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default AppBar;
