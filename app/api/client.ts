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