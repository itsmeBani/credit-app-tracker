import { Model, Relation, Query } from '@nozbe/watermelondb'
import { field, text, relation, children } from '@nozbe/watermelondb/decorators'
import ModelCustomers from './modelCustomers'
import ModelCreditItem from './model.creditItems'
import { CreditStatus } from '../types'
import ModelPayment from "./model.payments";

export default class ModelCredit extends Model {
    static table = 'credits' as const

    static associations = {
        customers: { type: 'belongs_to', key: 'customer_id' },
        credit_items: { type: 'has_many', foreignKey: 'credit_id' },
        payments: {
            type: 'has_many',
            foreignKey: 'credit_id',
        },
    } as const

    @field('customer_id') customerId!: string

    @relation('customers', 'customer_id')
    customer!: Relation<ModelCustomers>

    @children('credit_items') items!: Query<ModelCreditItem>

    @field('total_amount') totalAmount!: number
    @field('paid_amount') paidAmount!: number
    @text('status') status!: CreditStatus
    @children('payments')
    payments!: Query<ModelPayment>
    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}