import axios from "axios";
import {API_BASE_URL} from "../shared/utils/constant";



const apiClient = axios.create({
    baseURL: API_BASE_URL,
     withCredentials:true
});


export default apiClient;