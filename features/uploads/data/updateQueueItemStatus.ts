import ModelImageUploadQueue from "../../../local_database/model/model.imageUploadQueue";
import {localDatabase} from "../../../local_database";
import {QueueStatus} from "../types";


export const updateQueueItemStatus = async (
    queueId: string,
    status: QueueStatus
) => {
    await localDatabase.write(async () => {
        const ref = await localDatabase
            .get<ModelImageUploadQueue>('image_upload_queue')
            .find(queueId)

        await ref.update((r) => {
            r.status = status
        })
    })
}