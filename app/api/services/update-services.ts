import { ITask } from "@/app/types/ITask";  
import { httpClient } from "../client";  
import { urls } from "../urls";  

export async function updateTask(id: string, task: ITask) {  
    const { title, description, priority, completed } = task;   
    try {  
        const res = await httpClient().patch(urls.update(id), { 
            title: title,  
            description: description,  
            priority: priority,  
            completed: completed  
        });  
        return res.data; 
    } catch (error) {  
        console.error("Error updating task:", error);  
        throw error;   
    }  
}