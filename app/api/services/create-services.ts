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

        if (!userId) {  
            throw new Error("User ID is not available.");   
        }  

        const response = await httpClient().post(urls.create, {    
            title: data.title,  
            description: data.description,  
            priority: data.priority,  
            user: userId 
        });  

        return response.data;  
    } catch (error) {  
        console.error("Error creating task:", error);  
        throw error;    
    }  
};