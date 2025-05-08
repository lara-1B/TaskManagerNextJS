import { motion } from 'framer-motion';
import RegisterForm from '../components/forms/RegisterForm';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ x: '5vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '5vw', opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden"
        style={{ height: '90vh' }}
      >
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-orange-400 to-orange-500 text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us!</h2>
          <p className="text-sm mb-6">
            Already have an account? Login now to access your tasks and manage them efficiently.
          </p>
          <Link
            href="/login"
            className="py-2 px-4 bg-white text-orange-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
          >
            Login Here
          </Link>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center sm:w-[90vw]">
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center text-black mb-6">Register</h1>
            <RegisterForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
