import { Model, Relation } from '@nozbe/watermelondb'
import { field, relation, text } from '@nozbe/watermelondb/decorators'
import ModelCredit from './model.credits'

export default class ModelPayment extends Model {
    static table = 'payments'
    static associations = {
        credits: {
            type: 'belongs_to',
            key: 'credit_id',
        },
    } as const

    @field('credit_id') creditId!: string

    @relation('credits', 'credit_id')
    credit!: Relation<ModelCredit>

    // payment info
    @field('amount') amount!: number
    @text('note') note!: string

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}