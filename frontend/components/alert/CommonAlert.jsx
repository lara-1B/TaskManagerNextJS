import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CommonAlert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // Auto-close after 2 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-gradient-to-br from-orange-300 to-orange-400 text-white p-6 rounded-2xl shadow-xl text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white text-orange-200 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          OK
        </button>
      </div>
    </motion.div>
  );
}
