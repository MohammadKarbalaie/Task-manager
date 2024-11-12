"use client"
import React, { useEffect, useState } from 'react';  
import CreateModal from './CreateModal';  
import EditModal from './EditModal';    
import { fetchTasks } from '../api/services/list-services';  
import { ITask } from '../types/ITask';  
import { deleteTask } from '../api/services/delete-services';  


function Listtodo() {  
    const [tasks, setTasks] = useState<ITask[]>([]);  
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);  
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);  
    const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null); // وظیفه‌ای که باید ویرایش شود  
    
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
        setTasks(prev => [...prev, newTask]);  
    };  

    const handleTaskUpdated = (updatedTask: ITask) => {  
        setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));  
    };  

    const handleEditTask = (task: ITask) => {  
        setTaskToEdit(task);  
        setIsEditModalOpen(true);  
    };  

    return (  
        <div className='border w-[768px] mx-auto p-4 my-10'>  
            <button onClick={() => setIsCreateModalOpen(true)} className="bg-green-500 text-white p-2 mb-2">  
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
            {tasks.map((task) => {  
                let priorityClass = '';  
                if (task.priority === 'Low') {  
                    priorityClass = 'bg-green-200';  
                } else if (task.priority === 'Mid') {  
                    priorityClass = 'bg-yellow-200';  
                } else if (task.priority === 'High') {  
                    priorityClass = 'bg-red-200';  
                }  
                 
                return (  
                    <div key={task.id} className={`border mx-auto py-1 px-10 relative ${priorityClass}`}>  
                        <input type="checkbox" name='completed'  
                            defaultChecked={task.completed}  
                            className='absolute mt-2' />  
                        <h3 className='text-3xl ml-6'>{task.title}</h3>   
                        <div className='absolute top-0 right-0 mr-20'>  
                           <p onClick={() => handleEditTask(task)} className='py-1 px-4 cursor-pointer bg-gray-300 mt-2'>edit</p>  
                            <p onClick={() => deleteTask(task.id)} className='py-1 px-4 cursor-pointer bg-gray-300 mt-2'>delete</p>  
                        </div>  
                        <h4 className='text-xl'>{task.priority}</h4>  
                        <h4 className='text-xl text-gray-400'>{task.description}</h4>  
                    </div>  
                );  
            })}  
        </div>  
    );  
}  

export default Listtodo;