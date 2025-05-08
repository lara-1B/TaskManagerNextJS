import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import TaskModal from '../modal/TaskModal';

export default function TaskCard({ task }) {
  const [localTask, setLocalTask] = useState(task); // Local state for task
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityColors = {
    High: 'bg-rose-100 text-rose-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  const cardColors = {
    High: 'bg-rose-100',
    Medium: 'bg-yellow-100',
    Low: 'bg-blue-100',
  };

  if (!localTask) return null; // Add this check to prevent rendering if localTask is null

  const cardBgColor = cardColors[localTask.priority] || 'bg-gray-100';
  const bgColor = priorityColors[localTask.priority] || 'bg-gray-100 text-gray-800';

  const dueDate = new Date(localTask.dueDate);
  const today = new Date();
  const timeDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)); // in days

  const handleTaskUpdate = (updatedTask) => {
    setLocalTask(updatedTask); // Update the local task state
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className={`min-w-[250px] max-w-[300px] ${cardBgColor} rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden cursor-pointer`}
      >
        {/* Pattern background layer (subtle) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent)] pointer-events-none z-0" />

        {/* Content */}
        <div className="relative z-10">

          {/* Tags and Menu */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-2">
              <span className={`${bgColor} text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>#{localTask.priority}</span>
              <span className="bg-white/60 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">#{localTask.status}</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700 text-xl leading-none">⋮</button>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-800 leading-snug">{localTask.title}</h3>
          <p className="text-sm text-gray-700 mt-1 line-clamp-2">{localTask.description}</p>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center text-xs text-gray-700">
            <p><strong>Assigned to:</strong> {localTask.assignedTo?.name || 'Not assigned'}</p>
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-600" size={12} />
              <span>{timeDiff > 0 ? `${timeDiff} days` : 'Due'}</span>
            </div>
          </div>
        </div>
      </div>

      <TaskModal 
        task={localTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskUpdate={handleTaskUpdate} // Pass the update handler to the modal
      />
    </>
  );
}
