import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../../services/backendFetch';
import Alert from '../alert/CommonAlert';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import React Icons
import Link from 'next/link'; // Import Link from Next.js

export default function RegisterForm() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await registerUser({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role,
      });
      setSuccessMessage('Account created successfully! Redirecting to login');
      setTimeout(() => router.push('/login'), 2000); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      {successMessage && <Alert message={successMessage} onClose={() => setSuccessMessage('')} />}
      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs md:text-sm font-medium text-black mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full px-3 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
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
            className="w-full px-3 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
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
        <div>
          <label htmlFor="confirmPassword" className="block text-xs md:text-sm font-medium text-black mb-1">
            Confirm Password
          </label>
          <div className="text-black w-full flex items-center border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-orange-300">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="flex-grow px-3 py-1.5 md:px-4 md:py-3 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="px-3 py-1.5 md:px-4 md:py-3 focus:outline-none"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="role" className="block text-xs md:text-sm font-medium text-black mb-1">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={credentials.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 md:px-4 md:py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 md:py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:from-orange-500 hover:to-orange-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <p className="text-center text-xs text-black mt-3 md:hidden">
        Already have an account?{' '}
        <Link href="/login" className="text-orange-600 font-medium hover:underline">
          Login here
        </Link>
      </p>
    </>
  );
}
