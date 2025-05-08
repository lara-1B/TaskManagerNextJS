import { motion } from 'framer-motion';
import { useState } from 'react';
import TaskForm from '../forms/TaskForm';

export default function CreateTaskModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Create Task</h2>
        <TaskForm onClose={onClose} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
      </div>
    </motion.div>
  );
}
