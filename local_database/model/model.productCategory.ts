import { Model, Query } from '@nozbe/watermelondb'
import { field, text, children } from '@nozbe/watermelondb/decorators'
import ModelProducts from './model.products'

export default class ModelProductCategory extends Model {
    static table = 'product_categories' as const

    static associations = {
        products: { type: 'has_many', foreignKey: 'category_id' },
    } as const

    @text('name') name!: string
    @text('description') description!: string | null
    @text('image_url') imageUrl!: string | null
    @text('background_color') backgroundColor!: string | null

    // category → products
    @children('products') products!: Query<ModelProducts>

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}