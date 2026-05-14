import { Model, Relation, Query } from '@nozbe/watermelondb'
import { field, text, children } from '@nozbe/watermelondb/decorators'
import ModelCredit from './model.credits'

export default class ModelCustomers extends Model {
    static table = 'customers' as const

    static associations = {
        credits: { type: 'has_many', foreignKey: 'customer_id' },
    } as const

    @text('first_name') firstname!: string
    @text('last_name') lastname!: string
    // relations
    @children('credits') credits!: Query<ModelCredit>
    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}