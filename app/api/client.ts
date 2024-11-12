import axios from "axios";  
import PocketBase from "pocketbase";  

const url = "https://source-tent.pockethost.io/";  
export const client = new PocketBase(url);  
client.autoCancellation(false);  

export const httpClient = () => {  
    return axios.create({  
        baseURL: url,
    });  
};






// import axios from "axios";  
// import PocketBase from "pocketbase";  

// const url = "https://source-tent.pockethost.io/";  
// export const client = new PocketBase(url);  
// client.autoCancellation(false);  

// export const httpClient = () => {  
//     const instance = axios.create({  
//         baseURL: url,
//     });  

//     // اضافه کردن interceptor برای توکن احراز هویت
//     instance.interceptors.request.use(
//         (config) => {
//             const authToken = localStorage.getItem('authToken');
//             if (authToken) {
//                 config.headers.Authorization = `Bearer ${authToken}`;
//             }
//             return config;
//         },
//         (error) => Promise.reject(error)
//     );

//     return instance;  
// };