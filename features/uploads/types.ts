
export type UploadQueueTable =
    | "product_categories"
    | "products";

export interface EnqueueImageUploadParams {
    referenceTable: UploadQueueTable,
    referenceId: string
    localUri: string
}


export type QueueStatus = 'pending' | 'uploaded' | 'failed'
