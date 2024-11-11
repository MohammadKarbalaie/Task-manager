export interface ITask {  
    id: string;  
    title: string;   
    description: string;  
    priority: "Low" | "Mid" | "High";   
    completed: boolean;   
}  