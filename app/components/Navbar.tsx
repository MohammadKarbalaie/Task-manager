"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "../api/services/auth-services";
import { HiMenu, HiX } from "react-icons/hi"; 

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-[#1f2937] p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center justify-between w-full md:w-auto">
        <p className="text-2xl font-medium text-gray-200 cursor-pointer hover:shadow-yellow-300 rounded-xl transition hover:scale-105">
          Task Manager
        </p>
        <button
          onClick={toggleMenu}
          className="text-gray-200 md:hidden focus:outline-none"
        >
          {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full">
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
