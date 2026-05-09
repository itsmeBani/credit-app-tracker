    import { Model } from '@nozbe/watermelondb'
    import { text, field } from '@nozbe/watermelondb/decorators'
    import {QueueStatus} from "../../features/uploads/types";

    export default class ModelImageUploadQueue extends Model {
        static table = 'image_upload_queue' as const

        @text('reference_table') referenceTable!: string
        @text('reference_id') referenceId!: string

        @text('local_uri') localUri!: string

        @text('status') status!: QueueStatus

        @field('created_at') createdAt!: number
        @field('updated_at') updatedAt!: number

    }