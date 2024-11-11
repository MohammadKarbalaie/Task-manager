import { httpClient } from "../client";  
import { urls } from "../urls";  

export async function deleteTask(id: string) {  
    const con = window.confirm("Are you sure?!?!?");  
    if (!con) {  
        return;  
    }  
    try {  
        const response = await httpClient().delete(urls.delete(id)); 
        console.log("Task deleted successfully:", response.data); 
        window.location.reload();  
    } catch (error) {  
        console.error("Error deleting task:", error);  
        alert("An error occurred while deleting the task. Please try again."); 
    }  
}  