import { ITask } from "@/app/types/ITask";  
import { httpClient } from "../client";  
import { urls } from "../urls";  

export const fetchTasks = async (): Promise<ITask[]> => {  
    try {  
        const res = await httpClient().get(urls.list);   
        const tasks: ITask[] = res.data.items.map((task: { id: string; title: string; description: string; priority: string; completed: boolean; })  => ({   
            id: task.id,  
            title: task.title,  
            description: task.description,  
            priority: task.priority,  
            completed: task.completed  
        }));  

        return tasks;  
    } catch (error) {  
        console.error("Error fetching tasks:", error);  
        throw error;    
    }  
};  