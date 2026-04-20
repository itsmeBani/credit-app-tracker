import { Model, Relation } from '@nozbe/watermelondb'
import { field, text, relation } from '@nozbe/watermelondb/decorators'
import ModelUsers from './model.users'
import ModelProducts from './model.products'

export default class ModelCredit extends Model {
    static table = 'credits'

    @field('customer_id') customerId!: number
    @field('product_id') productId!: number

    // credit → user
    @relation('users', 'customer_id')
    customer!: Relation<ModelUsers>

    // credit → product
    @relation('products', 'product_id')
    product!: Relation<ModelProducts>

    @field('quantity') quantity!: number

    @text('status') status!: string
    @text('price_at_purchase') priceAtPurchase!: string

    @field('paid_at') paidAt!: number | null

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}