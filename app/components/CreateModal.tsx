"use client";   
import React, { useState } from 'react';  
import { ITask } from "@/app/types/ITask";  
import { createTask } from "../api/services/create-services"; // مسیر صحیح را وارد کنید  

interface CreateModalProps {  
    isOpen: boolean;  
    onClose: () => void;  
    onTaskCreated: (task: ITask) => void;  
}  

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onTaskCreated }) => {  
    const [title, setTitle] = useState('');  
    const [description, setDescription] = useState('');  
    const [priority, setPriority] = useState<'Low' | 'Mid' | 'High'>('Low');  

    const handleSubmit = async (event: React.FormEvent) => {  
        event.preventDefault();  
        
        const newTask = {  
            title,  
            description,  
            priority  
        };  

        try {  
            // استفاده از تابع createTask برای ایجاد کار جدید  
            const createdTask: ITask = await createTask(newTask);  

            // بازخورد به بالا در کامپوننت پدر  
            onTaskCreated(createdTask);  

            // پاکسازی فرم  
            setTitle('');  
            setDescription('');  
            setPriority('Low');  

            // بستن مودال  
            onClose();  
        } catch (error) {  
            console.error("Error creating task:", error);  
        }  
    };  

    if (!isOpen) return null;  

    return (  
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">  
            <div className="bg-white p-4 rounded-md shadow-md">  
                <h2 className="text-xl mb-4">Create New Task</h2>  
                <form onSubmit={handleSubmit}>  
                    <div className="mb-4">  
                        <label className="block" htmlFor="title">Title:</label>  
                        <input  
                            id="title"  
                            type="text"  
                            className="border p-2 w-full"  
                            value={title}  
                            onChange={(e) => setTitle(e.target.value)}  
                            required  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label className="block" htmlFor="description">Description:</label>  
                        <textarea  
                            id="description"  
                            className="border p-2 w-full"  
                            value={description}  
                            onChange={(e) => setDescription(e.target.value)}  
                            required  
                        />  
                    </div>  
                    <div className="mb-4">  
                        <label className="block" htmlFor="priority">Priority:</label>  
                        <select  
                            id="priority"  
                            className="border p-2 w-full"  
                            value={priority}  
                            onChange={(e) => setPriority(e.target.value as 'Low' | 'Mid' | 'High')}  
                        >  
                            <option value="Low">Low</option>  
                            <option value="Mid">Mid</option>  
                            <option value="High">High</option>  
                        </select>  
                    </div>  
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">  
                        Create Task  
                    </button>  
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">  
                        Cancel  
                    </button>  
                </form>  
            </div>  
        </div>  
    );  
};  

export default CreateModal;