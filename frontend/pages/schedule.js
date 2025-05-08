import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import CalendarView from "../components/schedule/Calendar";
import TaskProvider from "../context/TaskContext";

export default function Schedule() {
  return (
    <TaskProvider>
      <div className="pt-16 md:pl-64 pb-20">
        <Header showSearch={false} />
        <Sidebar />
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-6">Schedule Page</h2>
          <CalendarView />
        </main>
      </div>
    </TaskProvider>
  );
}
