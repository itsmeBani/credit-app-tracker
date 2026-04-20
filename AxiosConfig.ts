import axios from "axios";
// http://192.168.8.34:3000/v1
// http://192.168.8.45:3000/v1

export const API_BASE_URL = "https://proud-doorbell-dimmed.ngrok-free.dev/v1";


const apiClient = axios.create({
    baseURL: API_BASE_URL,
     withCredentials:true
});


export default apiClient;