import TaskManager from "../components/TaskManager";

export default function Tasks() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskManager />
    </div>
  );
}
