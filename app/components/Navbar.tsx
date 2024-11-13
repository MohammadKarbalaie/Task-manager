"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "../api/services/auth-services";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full bg-[#1f2937] p-4 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
      <div className="text-center md:text-left">
        <p className="text-2xl font-medium text-gray-200 cursor-pointer hover:shadow-yellow-300 rounded-xl transition hover:scale-105">
          Task Manager
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <li className="px-4 py-2 text-gray-200 hover:text-black rounded-xl hover:bg-zinc-300 transition hover:scale-105">
            <Link href="/">Home</Link>
          </li>
          <li className="px-4 py-2 text-gray-200 hover:text-black rounded-xl hover:bg-zinc-300 transition hover:scale-105">
            <Link href="/auth/tasks">Tasks</Link>
          </li>

          {isLoggedIn && (
            <>
              <li className="px-4 py-2 text-gray-200 hover:text-black rounded-xl hover:bg-zinc-300 transition hover:scale-105">
                <Link href="/auth/tasks/inprogress">In Progress</Link>
              </li>
              <li className="px-4 py-2 text-gray-200 hover:text-black rounded-xl hover:bg-zinc-300 transition hover:scale-105">
                <Link href="/auth/tasks/done">Done</Link>
              </li>
            </>
          )}

          <li className="px-4 py-2 text-gray-200 hover:text-black rounded-xl hover:bg-zinc-300 transition hover:scale-105">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="focus:outline-none">
                Logout
              </button>
            ) : (
              <Link href="/auth">Login/Signup</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
