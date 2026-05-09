import { Model, Relation, Query } from '@nozbe/watermelondb'
import { field, text, relation, children } from '@nozbe/watermelondb/decorators'
import ModelProductCategory from './model.productCategory'
import ModelCredit from './model.credits'

export default class ModelProducts extends Model {
    static table = 'products' as const

    @text('name') name!: string
    @text('description') description!: string | null
    @text('price') price!: string
    @text('image_url') imageUrl!: string
    @text('status') status!:  "AVAILABLE" | "UNAVAILABLE"

    @field('category_id') categoryId!: string

    // product → category
    @relation('product_categories', 'category_id')
    category!: Relation<ModelProductCategory>

    // product → credits
    @children('credits') credits!: Query<ModelCredit>

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}