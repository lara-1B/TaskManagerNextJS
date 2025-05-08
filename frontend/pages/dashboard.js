import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import TaskLists from "../components/dashboard/TaskLists";
import TaskProvider from "../context/TaskContext";
import HeaderBar from "@/components/dashboard/HeaderBar";

export default function Dashboard() {
  return (
    <TaskProvider>
      <div className="pt-16 md:pl-64 pb-20">
        <Header showSearch={true} />
        <Sidebar />
        <main className="p-4">
        <HeaderBar/>
          
          <TaskLists />
        </main>
      </div>
    </TaskProvider>
  );
}
