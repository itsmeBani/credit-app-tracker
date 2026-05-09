import {Model, Query, Relation} from '@nozbe/watermelondb'
import { field, text, relation, children } from '@nozbe/watermelondb/decorators'
import ModelCustomers from "./modelCustomers";
import ModelCreditItem from "./model.creditItems";
import {CreditStatus} from "../types";


export default class ModelCredit extends Model {
    static table = 'credits'

    // owner
    @field('customer_id') customerId!: string

    @relation('customers', 'customer_id')
    customer!: Relation<ModelCustomers>

    // relations
    @children('credit_items') items!: Query<ModelCreditItem>

    // summary
    @field('total_amount') totalAmount!: number
    @text('status') status!:CreditStatus
    @field('paid_amount') paidAmount!: number

    @field('created_at') createdAt!: number
    @field('updated_at') updatedAt!: number
    @field('deleted_at') deletedAt!: number | null
}