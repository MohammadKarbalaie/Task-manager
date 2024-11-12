import { ITask } from "@/app/types/ITask";  
import { client, httpClient } from "../client";  
import { urls } from "../urls";  

interface CreateTaskData {  
    title: string;  
    description: string;  
    priority: 'Low' | 'Mid' | 'High';  
}  

export const createTask = async (data: CreateTaskData): Promise<ITask> => {  
    try {  
        const userId = client.authStore.model?.id;  
        const authToken = localStorage.getItem('authToken');  

        if (!userId) {  
            throw new Error("User ID is not available.");   
        }  
        
        if (!authToken) {
            throw new Error("Authentication token is not available.");
        }

        const response = await httpClient().post(urls.create, {    
            title: data.title,  
            description: data.description,  
            priority: data.priority,  
            user: userId  
        }, {  
            headers: {  
                Authorization: `Bearer ${authToken}`  
            }  
        });  

        return response.data;  
    } catch (error) {  
        console.error("Error creating task:", error);  
        throw error;    
    }  
};
