import {UploadApiResponse} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";
import {upload} from "cloudinary-react-native";
import {Cloudinary} from "@cloudinary/url-gen";
import {fetchCloudinarySignature} from "./fetchCloudinarySignature";

const cld = new Cloudinary({
    cloud: {
        cloudName: 'ddrn6ok5m'
    },
    url: {
        secure: true
    }
});


export const uploadImageToCloud =async (
    file: string,

): Promise<UploadApiResponse> => {

    const {api_key,signature,timestamp} = await fetchCloudinarySignature()

    const options = {
        signature,
        timestamp,
        api_key,

    }
    return await new Promise((resolve, reject) => {
        upload(cld, {
            file,
            options,
            callback: (
                error,
                response
            ) => {
                if (error) {
                    reject(error)
                    return
                }

                if (!response) {
                    reject(new Error("No response returned"))
                    return
                }

                resolve(response)
            },
        })
    })
}