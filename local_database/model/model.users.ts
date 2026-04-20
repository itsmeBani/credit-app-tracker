import { Model, Relation, Query } from '@nozbe/watermelondb'
import { field, text, children } from '@nozbe/watermelondb/decorators'
import ModelCredit from './model.credits'

export default class ModelUsers extends Model {
    static table = 'users'

    @text('first_name') firstname!: string
    @text('last_name') lastname!: string
    @text('email') email!: string
    @text('role') role!: string

    // relations
    @children('credits') credits!: Query<ModelCredit>

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}