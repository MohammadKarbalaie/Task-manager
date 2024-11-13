"use client";
import React, { useEffect, useState } from "react";
import CreateModal from "../../components/CreateModal";
import EditModal from "../../components/EditModal";
import { fetchTasks } from "../../api/services/list-services";
import { ITask } from "../../types/ITask";
import { deleteTask } from "../../api/services/delete-services";
import { FiEdit2 } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";

function Listtodo() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const handleTaskCreated = (newTask: ITask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask: ITask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleEditTask = (task: ITask) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const priorityColors = {
    High: "bg-[#ffb1b1]",
    Mid: "bg-[#ffdbb1]",
    Low: "bg-[#ebe7ff]",
  };

  const TasksByPriority = (priority: "High" | "Mid" | "Low") => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks
        .filter((task) => task.priority === priority)
        .map((task) => (
          <div
            key={task.id}
            className={`p-4 relative rounded-lg shadow-md ${priorityColors[priority]}`}
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <div className="flex gap-2 absolute bottom-2 right-2">
              <p
                onClick={() => handleEditTask(task)}
                className="p-2 cursor-pointer rounded-md bg-yellow-700 text-white"
              >
                <FiEdit2 />
              </p>
              <p
                onClick={() => deleteTask(task.id)}
                className="p-2 cursor-pointer rounded-md bg-red-500 text-white"
              >
                <TiDelete />
              </p>
            </div>
            <h4 className="text-sm font-medium mt-1">{task.priority}</h4>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div className="w-full max-w-[1440px] bg-[#ffcfcf] mx-auto p-4 sm:p-6 md:p-8 my-10 h-full min-h-screen">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-green-600 transition-colors duration-200"
      >
        Create New Task
      </button>
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={taskToEdit}
        onTaskUpdated={handleTaskUpdated}
      />
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">High priority</h2>
        {TasksByPriority("High")}
      </div>
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Medium priority</h2>
        {TasksByPriority("Mid")}
      </div>
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Low priority</h2>
        {TasksByPriority("Low")}
      </div>
    </div>
  );
}

export default Listtodo;
