"use client";
import React, { useState } from "react";
import { ITask } from "@/app/types/ITask";
import { createTask } from "../api/services/create-services"; // مسیر صحیح را وارد کنید

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: ITask) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onTaskCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Mid" | "High">("Low");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask = {
      title,
      description,
      priority,
    };

    try {
      const createdTask: ITask = await createTask(newTask);
      onTaskCreated(createdTask);
      setTitle("");
      setDescription("");
      setPriority("Low");
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center
     bg-black bg-opacity-50"
    >
      <div className="bg-gray-300 w-[640px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl mb-4 text-gray-800 rounded-xl bg-sky-400 py-2 px-4">
          Create New Task
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block" htmlFor="title">
              Title:
            </label>
            <input
              id="title"
              type="text"
              className="border p-2 w-full rounded-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              className="border p-2 w-full rounded-xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="priority">
              Priority:
            </label>
            <select
              id="priority"
              className="border p-2 w-full rounded-xl"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "Low" | "Mid" | "High")
              }
            >
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
