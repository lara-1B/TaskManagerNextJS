import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskCard from '../dashboard/TaskCard';

export default function CalendarView() {
  const { tasks } = useContext(TaskContext);

  const getUpcomingDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date) => date.toISOString().split('T')[0];
  const formatHour = (date) => new Date(date).getHours();

  const upcomingDays = getUpcomingDays();

  return (
    <div className="overflow-auto px-4 py-6">
      <table className="table-auto border-collapse w-full min-w-[1200px]">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b bg-gray-50">
              Date
            </th>
            {Array.from({ length: 24 }).map((_, hour) => (
              <th
                key={hour}
                className="px-2 py-2 text-xs text-gray-600 font-semibold border-b border-l text-center bg-gray-50"
              >
                {hour.toString().padStart(2, '0')}:00
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {upcomingDays.map((day) => {
            const dayKey = formatDate(day);
            const dayTasks = tasks.filter(
              (task) => formatDate(new Date(task.dueDate)) === dayKey
            );

            const tasksByHour = {};
            dayTasks.forEach((task) => {
              const hour = formatHour(task.dueDate);
              if (!tasksByHour[hour]) tasksByHour[hour] = [];
              tasksByHour[hour].push(task);
            });

            const isEmpty = Object.keys(tasksByHour).length === 0;

            return (
              <tr key={dayKey} className="border-t">
                <td className="font-medium text-gray-800 px-4 py-2 whitespace-nowrap align-top border-r">
                  {day.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>

                {isEmpty ? (
                  <td
                    colSpan={24}
                    className="text-gray-500 text-sm italic py-4 text-center border-b"
                  >
                    No tasks scheduled for this day.
                  </td>
                ) : (
                  Array.from({ length: 24 }).map((_, hour) => (
                    <td
                      key={hour}
                      className="align-top px-1 py-2 min-w-[100px] border-l"
                    >
                      <div className="space-y-2">
                        {tasksByHour[hour]?.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))}
                      </div>
                    </td>
                  ))
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
