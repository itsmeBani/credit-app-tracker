import { Model, Relation } from '@nozbe/watermelondb'
import { field, relation, text } from '@nozbe/watermelondb/decorators'
import ModelCredit from './model.credits'
import ModelProducts from './model.products'

export default class ModelCreditItem extends Model {
    static table = 'credit_items'

    // relations

    static associations = {
        credits: { type: 'belongs_to', key: 'credit_id' },
        products:{ type: 'belongs_to', key: 'product_id' }
    } as const

    @field('credit_id') creditId!: string
    @field('product_id') productId!: string

    @relation('credits', 'credit_id')
    credit!: Relation<ModelCredit>

    @relation('products', 'product_id')
    product!: Relation<ModelProducts>

    // snapshot data (IMPORTANT)
    @field('quantity') quantity!: number
    @field('price_at_purchase') priceAtPurchase!: number

    // computed
    @field('subtotal') subtotal!: number

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}