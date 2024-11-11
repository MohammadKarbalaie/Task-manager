"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "../api/services/auth-services";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const user = await login(email, password);
      if (user) {
        console.log("Logged in successfully:", user);
        router.push("/auth/tasks");
      }
    } else {
      const user = await signup({ email, password, username });
      if (user) {
        console.log("Signed up successfully:", user);
        setIsLogin(true); // نمایش فرم لاگین پس از ثبت‌نام موفق
      }
    }
  };

  return (
    <div className="flex gap-4 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-96 gap-4 bg-slate-100 rounded-2xl items-center justify-center border p-4 my-60 mx-40"
      >
        <h2 className="py-2 px-8 rounded-xl bg-sky-400 flex items-center justify-center text-white text-4xl">
          {isLogin ? "Login" : "Signup"}
        </h2>
        {!isLogin && (
          <input
            type="text"
            className="border py-2 px-10 rounded-xl"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          className="border py-2 px-10 rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border py-2 px-10 rounded-xl"
        />
        <button
          className="py-2 px-8 bg-green-500 text-white rounded-xl"
          type="submit"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <div
        onClick={() => setIsLogin(!isLogin)}
        className="h-screen w-screen mx-auto cursor-pointer bg-purple-500 text-white text-xl flex items-center justify-center"
      >
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </div>
    </div>
  );
}
