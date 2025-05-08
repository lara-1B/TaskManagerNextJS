import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Alert({ message, onClose, onConfirm }) {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(onClose, 5000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleConfirm = () => {
    if (isProcessing) return; 
    setIsProcessing(true);
    onConfirm();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 rounded-2xl shadow-xl text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="px-4 py-2 bg-white text-orange-500 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 bg-white text-orange-500 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
}
