import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../../services/backendFetch';
import { AuthContext } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import React Icons
import Link from 'next/link'; // Import Link from Next.js

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      setAuth({
        isLoggedIn: true,
        token: data.token,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      });

      router.push('/dashboard'); // Redirect to /dashboard after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs md:text-sm font-medium text-black mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="text-black w-full px-3 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-xs md:text-sm font-medium text-black mb-1">
            Password
          </label>
          <div className="text-black w-full flex items-center border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-orange-300">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="flex-grow px-3 py-1.5 md:px-4 md:py-3 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 py-1.5 md:px-4 md:py-3 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 md:py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:from-orange-500 hover:to-orange-600 transition duration-200"
        >
          Login
        </button>
      </form>
      <p className="text-center text-xs text-black mt-3 md:hidden">
        Don't have an account?{' '}
        <Link href="/register" className="text-orange-600 font-medium hover:underline">
          Register here
        </Link>
      </p>
    </>
  );
}
