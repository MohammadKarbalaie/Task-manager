"use client";
import React, { useState, useEffect } from "react";
import { ITask } from "../types/ITask";
import { updateTask } from "../api/services/update-services";  

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask | null;
  onTaskUpdated: (updatedTask: ITask) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  task,
  onTaskUpdated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Mid" | "High">("Low");
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCompleted(task.completed); 
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      const updatedTask: ITask = {
        ...task,
        title,
        description,
        priority,
        completed, 
      };
      await updateTask(updatedTask.id, updatedTask);
      onTaskUpdated(updatedTask);
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#ebe7ff] w-[640px] p-6 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg mb-4 bg-[#1f2937] rounded-xl text-white py-2 px-6">Edit Task</h2>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border rounded-md w-full p-2"
            />
          </label>
          <label className="block mb-2">
            Priority:
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "Low" | "Mid" | "High")
              }
              className="border rounded-md w-full p-2"
            >
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>
          </label>
          <div className="block mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="mr-2"
              />
              Completed
            </label>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-[#1f2937] text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-black py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
