import { Q } from '@nozbe/watermelondb'
import { localDatabase } from '../../../local_database'
import ModelImageUploadQueue from '../../../local_database/model/model.imageUploadQueue'
import {EnqueueImageUploadParams} from "../types";



export const enqueueImageUpload = async ({
                                             referenceTable,
                                             referenceId,
                                             localUri,
                                         }: EnqueueImageUploadParams) => {
    const queue = localDatabase.get<ModelImageUploadQueue>('image_upload_queue')

    const existing = await queue
        .query(
            Q.where('reference_table', referenceTable),
            Q.where('reference_id', referenceId),
            Q.where('status', 'pending')
        )
        .fetch()

    if (existing.length > 0) return

    return queue.create(item => {
        item.referenceTable = referenceTable
        item.referenceId = referenceId
        item.localUri = localUri

        item.status = 'pending'
        item.createdAt = Date.now()
        item.updatedAt = Date.now()
    })
}
