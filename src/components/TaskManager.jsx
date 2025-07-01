import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLocalStorage from "../hooks/useLocalStorage";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), title: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const filtered = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a task"
          className="flex-1 px-3 py-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      <div className="flex gap-3">
        {["All", "Active", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        <AnimatePresence>
          {filtered.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
