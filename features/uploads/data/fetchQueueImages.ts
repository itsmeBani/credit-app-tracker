import ModelImageUploadQueue from "../../../local_database/model/model.imageUploadQueue";
import { localDatabase } from "../../../local_database";
import { Q } from "@nozbe/watermelondb";

export const fetchQueueImages = async () => {
    const collection = localDatabase.get<ModelImageUploadQueue>('image_upload_queue');

    const result = await collection
        .query(
            Q.where('status', Q.oneOf(['pending', 'failed'])),
            Q.sortBy('created_at', Q.asc)
        )
        .fetch();


    return result.length > 0 ? result : null;
};