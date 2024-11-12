import { ITask } from "@/app/types/ITask";  
import { httpClient } from "../client";  
import { urls } from "../urls";  

export async function updateTask(id: string, task: ITask) {  
    const { title, description, priority, completed } = task;   

    try {  
        const authToken = localStorage.getItem('authToken');  

        if (!authToken) {
            throw new Error("Authentication token is not available.");
        }

        const res = await httpClient().patch(urls.update(id), { 
            title: title,  
            description: description,  
            priority: priority,  
            completed: completed  
        }, {  
            headers: {  
                Authorization: `Bearer ${authToken}`  
            }  
        });  

        return res.data; 
    } catch (error) {  
        console.error("Error updating task:", error);  
        throw error;   
    }  
}
