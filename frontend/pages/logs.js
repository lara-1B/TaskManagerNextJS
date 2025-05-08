import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import LogList from "../components/logs/LogList";
import { fetchAuditLogs } from "../services/backendFetch";

export default function Logs() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedRole, setCheckedRole] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    setCheckedRole(true);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAuditLogs()
        .then((data) => setLogs(data))
        .catch((err) => console.error("Failed to fetch logs:", err))
        .finally(() => setLoading(false));
    }
  }, [isAdmin]);

  if (!checkedRole) {
    return null; // Optionally, show a loading spinner here
  }

  if (!isAdmin) {
    return (
      <div className="pt-16 md:pl-64 pb-20">
        <Header showSearch={false} />
        <Sidebar />
        <main className="p-4">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="mt-2">Sorry, only admins can access this page.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pl-64 pb-20">
      <Header showSearch={false} />
      <Sidebar />
      <main className="p-4">
        <h2 className="text-2xl font-bold">Logs Page</h2>
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <LogList logs={logs} />
        )}
      </main>
    </div>
  );
}
