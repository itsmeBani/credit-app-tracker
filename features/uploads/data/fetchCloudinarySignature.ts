import axios from "axios";
import {API_BASE_URL} from "../../../shared/utils/constant";

export interface CloudinaryUploadSignature {
    signature: string;
    timestamp: number;
    api_key: string;
    cloud_name: string;
}
export  const fetchCloudinarySignature = async () :Promise<CloudinaryUploadSignature> => {

        const response = await axios.get(
            `${API_BASE_URL}/auth/cloudinary-signature`
        );

        return response.data

};
