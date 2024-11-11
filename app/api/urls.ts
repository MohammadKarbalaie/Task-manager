export const urls = {  
    signup:"/api/collections/users/records",
    list:"/api/collections/tasks/records",
    create: "/api/collections/tasks/records",
    update: (id: string) => `/api/collections/tasks/records/${id}`,  
    delete : (id: string) => `/api/collections/tasks/records/${id}`,
};