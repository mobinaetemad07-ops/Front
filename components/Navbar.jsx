"use client";

import { Book, LogOut } from "lucide-react";
import Link from "next/link";

import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout, isLoggingOut } = useAuth();

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
        
        
        <div className="flex items-center gap-2 shrink-0">
          <Book size={30} color="blue" />

          <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            EnglishHub
          </h1>
        </div>

        
        <h1 className="hidden sm:block text-slate-700 text-sm md:text-xl lg:text-2xl font-bold truncate">
          Learning English with the best tutors
        </h1>

        
        <div className="shrink-0">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base hover:bg-red-600 transition disabled:opacity-50"
            >
              <LogOut size={18} />

              {isLoggingOut ? "Loading..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;