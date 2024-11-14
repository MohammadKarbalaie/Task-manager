/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { login, signup } from "../api/services/auth-services";
import Loadercomponent from "./Loadercomponent";
import { showToastErr, Toast } from "../lib/toastConfig";


const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface InputFieldProps {
  icon: React.ElementType;
  placeholder: string;
  type: string;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon: Icon,
  placeholder,
  type,
  register,
  name,
  error,
}) => (
  <div className="flex flex-col">
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      <Icon className="text-gray-500 mr-2" />
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="flex-1 outline-none"
      />
    </div>
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

const LoginSignupPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleMode = () => setIsLogin(!isLogin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(data.email, data.password);
        if (user) {
          console.log("Logged in successfully:", user);
          showToastErr(`Logged in successfully: ${user}`,'success');
         setTimeout(() => {
          router.push("/auth/tasks");
         }, 5000);
        } else {
          showToastErr("Login failed. Please check your credentials.");
        }
      } else {
        if (data.username) {
          const user = await signup({
            email: data.email,
            password: data.password,
            username: data.username,
          });
          if (user) {
            showToastErr("Signed up successfully. Please log in.");
            setIsLogin(true);
          } else {
            showToastErr("Signup failed. Try again later.");
          }
        } else {
          showToastErr("Username is required for signup.");
        }
      }
    } catch (error) {
      showToastErr("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {!isLogin && (
                  <InputField
                    icon={User}
                    placeholder="Full Name"
                    type="text"
                    register={register}
                    name="username"
                    error={errors.username?.message}
                  />
                )}
                <InputField
                  icon={Mail}
                  placeholder="Email"
                  type="email"
                  register={register}
                  name="email"
                  error={errors.email?.message}
                />
                <InputField
                  icon={Lock}
                  placeholder="Password"
                  type="password"
                  register={register}
                  name="password"
                  error={errors.password?.message}
                />
                <button
                  type="submit"
                  className={`text-white px-6 py-3 rounded-lg w-full flex items-center justify-center ${
                    isLogin ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {isLogin ? "Sign In" : "Sign Up"}{" "}
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </form>
              {loading && (
                <p className="flex items-center justify-center mt-8">
                  <Loadercomponent />
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 ${
          isLogin ? "bg-blue-600" : "bg-green-600"
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {isLogin ? "New here?" : "Already have an account?"}
          </h2>
          <p className="text-gray-200 mb-8">
            {isLogin
              ? "Sign up and discover a great amount of new opportunities!"
              : "Sign in to access your account and continue your journey!"}
          </p>
          <button
            className="bg-white px-6 py-3 rounded-lg"
            style={{ color: isLogin ? "#2563EB" : "#059669" }}
            onClick={toggleMode}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
      <Toast /> 
    </div>
  );
};

export default LoginSignupPage;
