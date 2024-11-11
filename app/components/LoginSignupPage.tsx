"use client"
import React, { useState, ChangeEvent } from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { Mail, Lock, User, ArrowRight, Github, Twitter } from 'lucide-react';  

interface InputFieldProps {  
  icon: React.ElementType;    
  placeholder: string;  
  type: string; 
  value: string;  
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;   
}  

const InputField: React.FC<InputFieldProps> = ({   
  icon: Icon,   
  placeholder,   
  type,   
  value,   
  onChange   
}) => (  
  <div className="flex items-center border border-gray-300 rounded-lg p-2">  
    <Icon className="text-gray-500 mr-2" />  
    <input  
      type={type}  
      placeholder={placeholder}  
      value={value}  
      onChange={onChange}  
      className="flex-1 outline-none"  
    />  
  </div>  
);  

const LoginSignupPage: React.FC = () => {  
  const [isLogin, setIsLogin] = useState(true);  
  const [email, setEmail] = useState<string>('');  
  const [password, setPassword] = useState<string>('');  
  const [name, setName] = useState<string>('');  

  const toggleMode = () => setIsLogin(!isLogin);  

  return (  
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">  
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">  
        <div className="w-full max-w-md">  
          <AnimatePresence mode="wait">  
            <motion.div  
              key={isLogin ? 'login' : 'signup'}  
              initial="hidden"  
              animate="visible"  
              exit="hidden"  
              transition={{ duration: 0.3 }}  
            >  
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">  
                {isLogin ? 'Welcome back' : 'Create account'}  
              </h1>  
              <div className="space-y-4">  
                {!isLogin && (  
                  <InputField  
                    icon={User}  
                    placeholder="Full Name"  
                    type="text"  
                    value={name}  
                    onChange={(e) => setName(e.target.value)}  
                  />  
                )}  
                <InputField  
                  icon={Mail}  
                  placeholder="Email"  
                  type="email"  
                  value={email}  
                  onChange={(e) => setEmail(e.target.value)}  
                />  
                <InputField  
                  icon={Lock}  
                  placeholder="Password"  
                  type="password"  
                  value={password}  
                  onChange={(e) => setPassword(e.target.value)}  
                />  
              </div>  
              <div className="mt-8">  
                <button  
                  className={`text-white px-6 py-3 rounded-lg w-full flex items-center justify-center ${isLogin ? 'bg-blue-600' : 'bg-green-600'}`}  
                >  
                  {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight className="ml-2" size={20} />  
                </button>  
              </div>  
              {isLogin && (  
                <div className="mt-6 flex justify-center space-x-4">  
                  <button className="p-2 bg-gray-200 rounded-full">  
                    <Github className="text-gray-700 hover:text-white" size={24} />  
                  </button>  
                  <button className="p-2 bg-gray-200 rounded-full">  
                    <Twitter className="text-gray-700 hover:text-white" size={24} />  
                  </button>  
                </div>  
              )}  
            </motion.div>  
          </AnimatePresence>  
        </div>  
      </div>  

      <div className={`w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 ${isLogin ? 'bg-blue-600' : 'bg-green-600'}`}>  
        <div className="text-center">  
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">  
            {isLogin ? 'New here?' : 'Already have an account?'}  
          </h2>  
          <p className="text-gray-200 mb-8">  
            {isLogin   
              ? 'Sign up and discover a great amount of new opportunities!'   
              : 'Sign in to access your account and continue your journey!'}  
          </p>  
          <button  
            className="bg-white px-6 py-3 rounded-lg"  
            style={{ color: isLogin ? '#2563EB' : '#059669' }}  
            onClick={toggleMode}  
          >  
            {isLogin ? 'Sign Up' : 'Sign In'}  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default LoginSignupPage;