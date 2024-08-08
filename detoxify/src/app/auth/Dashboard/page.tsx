// app/auth/Dashboard/page.tsx

import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Detoxify</h1>
      <div className="space-y-4">
        <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </div>
    </div>
  );
};

export default Dashboard;
