import {enqueueImageUpload} from "../data/enqueueImageUpload";
import {fetchQueueImages} from "../data/fetchQueueImages";
import {uploadImageToCloud} from "../data/uploadImageToStorage";
import {updateQueueItemStatus} from "../data/updateQueueItemStatus";

import {appToast} from "../../../shared/components/toast";
import {localDatabase} from "../../../local_database";

import {EnqueueImageUploadParams, UploadQueueTable,} from "../types";

import {imageUpdateResolvers} from "../resolvers/imageUpdateResolvers";

import {Directory, File as ExpoFile, Paths} from "expo-file-system";

export class ImageUploadService {


    async addToQueue(data: EnqueueImageUploadParams) {
        await enqueueImageUpload(data);
    }


    async beginUpload() {
        try {
            const pendingImages = await fetchQueueImages();

            if (!pendingImages || pendingImages.length === 0) return;

            for (const item of pendingImages) {
                try {

                    const { secure_url } = await uploadImageToCloud(item.localUri);


                    const resolver =
                        imageUpdateResolvers[item.referenceTable as UploadQueueTable];


                    await localDatabase.write(async () => {
                        await resolver(item.referenceId, secure_url);
                    });


                    await updateQueueItemStatus(item.id, "uploaded");

                } catch  {
                    await updateQueueItemStatus(item.id, "failed");

                }
            }

        } catch (e) {
            console.log(e);
            appToast.error(
                "Upload failed. Will retry later.",
                "Upload Error"
            );
        }
    }

    // ✅ SAVE IMAGE LOCALLY
    saveImageToLocal(uri: string): string {
        try {

            const uploadDir = new Directory(Paths.document, "uploads");

            if (!uploadDir.exists) {
                uploadDir.create();
            }


            const extension = uri.split(".").pop() || "jpg";
            const fileName = `img_${Date.now()}.${extension}`;


            const destination = new ExpoFile(uploadDir, fileName);


            const source = new ExpoFile(uri);


            source.copy(destination);

            return destination.uri;

        } catch (error) {
            console.error("Error saving image:", error);
            throw error;
        }
    }
}