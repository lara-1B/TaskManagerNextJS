import React from "react";

const LogList = ({ logs }) => {
  const logColors = {
    delete: "bg-pink-100 text-pink-800",
    update: "bg-red-100 text-red-800",
    create: "bg-orange-100 text-orange-800",
    assign: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {logs.map((log) => {
        const logColor = logColors[log.action] || "bg-gray-100 text-gray-800";

        return (
          <div
            key={log._id}
            className={`w-[90%] p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ${logColor}`}
          >
            {/* Pattern background layer (subtle) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent)] pointer-events-none z-0" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-lg font-bold capitalize">{log.action} Log</h3>
              <p className="text-sm mt-2">
                <strong>User:</strong> {log.userId?.name || "Unknown"} (
                {log.userId?.email || "N/A"})
              </p>
              {log.taskId && (
                <p className="text-sm mt-1">
                  <strong>Task:</strong> {log.taskId.title || "No Title"} (ID:{" "}
                  {log.taskId._id})
                </p>
              )}
              <p className="text-sm mt-1">
                <strong>Timestamp:</strong>{" "}
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LogList;
