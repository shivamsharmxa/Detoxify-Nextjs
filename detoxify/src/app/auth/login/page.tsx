'use client';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // `toast` instead of `Toast`
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
   
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login success', response.data);
      toast.success('Login Successful!'); // Show success toast
      router.push('/');
    } catch (error: any) {
      console.log('Login Failed', error);
      toast.error('Login Failed. Please try again.'); // Show error toast
    } finally {
      setLoading(false); // Ensure loading is stopped after the request is complete
    }
  };

  useEffect(() => {
    if (user.email && user.password ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={onLogin} className="space-y-6">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={buttonDisabled || loading} // Disable the button when it's loading or the form is incomplete
              className={`w-full p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded font-semibold transition duration-200 ${
                buttonDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Loggin...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          Do not have an account? <Link href="/auth/Signup" className="text-indigo-500">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
