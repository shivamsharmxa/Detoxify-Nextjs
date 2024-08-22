// app/auth/Dashboard/page.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { TypewriterEffectSmooth } from 'src/app/components/ui/typewriter-effect';
import { Vortex } from "../../components/ui/vortex"; // Ensure the correct import path

const words = [
  { text: 'Start', className: 'text-white' },
  { text: 'Your', className: 'text-white' },
  { text: 'Learning Journey', className: 'text-red-500' },
  { text: 'with', className: 'text-white' },
  { text: 'Detoxify.', className: 'text-blue-500 dark:text-blue-500 font-bold' },
];

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <Vortex
        backgroundColor="black"
        className="flex flex-col justify-center items-center px-4 py-4 h-full"
      >
        {/* Dashboard Content */}
        <h2 className="mb-6 sm:mb-10 text-3xl sm:text-5xl font-bold text-white">
          <TypewriterEffectSmooth words={words} />
        </h2>

        {/* Additional Text */}
        <p 
        className="mb-8 sm:mb-12 text-lg sm:text-2xl text-gray-300 max-w-2xl text-center font-light animate-fadeIn opacity-0"
        style={{
         animation: 'fadeIn 2s ease-out forwards',
  }}
        >
        Experience a clean, distraction-free environment designed to guide you step by step toward achieving your goals efficiently and effortlessly.
      </p>
      
<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>

        {/* Buttons for Login and Signup */}
        <div className="flex space-x-6">
          <Link href="/auth/login">
            <button className="px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link href="/auth/Signup">
            <button className="px-8 py-4 text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
              Sign Up
            </button>
          </Link>
        </div>
      </Vortex>
    </div>
  );
};

export default Dashboard;

