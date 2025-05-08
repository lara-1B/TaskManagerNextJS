import { useContext, useRef } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskCard from './TaskCard';

export default function TaskLists() {
  const { filteredTasks, loading, searchQuery } = useContext(TaskContext);
  const scrollRefSoon = useRef(null);
  const scrollRefAll = useRef(null);
  const currentDate = new Date();

  const scroll = (ref, direction) => {
    if (!ref.current) return;
    const amount = 300;
    ref.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const visibleTasks = [...filteredTasks].sort((a, b) => {
    if (a.status === 'Completed' && b.status !== 'Completed') return 1;
    if (a.status !== 'Completed' && b.status === 'Completed') return -1;
    return 0;
  });

  const comingSoonTasks = filteredTasks.filter(task => {
    if (task.status === 'Completed') return false;

    const normalizedCurrentDate = new Date(currentDate.toDateString());
    const normalizedDueDate = new Date(new Date(task.dueDate).toDateString());

    const timeDiff = (normalizedDueDate - normalizedCurrentDate) / (1000 * 60 * 60 * 24);
    return timeDiff >= 0 && timeDiff <= 3;
  });

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="flex flex-col gap-10">

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Deadline Coming Soon</h2>
          <div className="flex space-x-2">
            <button onClick={() => scroll(scrollRefSoon, 'left')} className="px-2 text-lg font-bold">&lt;</button>
            <button onClick={() => scroll(scrollRefSoon, 'right')} className="px-2 text-lg font-bold">&gt;</button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Tasks that need to be completed in 3 days or less.
        </p>
        {comingSoonTasks.length > 0 ? (
          <div
            ref={scrollRefSoon}
            className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {comingSoonTasks.map(task => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks due soon.</p>
        )}
      </div>


      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">All Tasks</h2>
          <div className="flex space-x-2">
            <button onClick={() => scroll(scrollRefAll, 'left')} className="px-2 text-lg font-bold">&lt;</button>
            <button onClick={() => scroll(scrollRefAll, 'right')} className="px-2 text-lg font-bold">&gt;</button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">All tasks in the system.</p>
        {visibleTasks.length > 0 ? (
          <div
            ref={scrollRefAll}
            className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {visibleTasks.map(task => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
}
