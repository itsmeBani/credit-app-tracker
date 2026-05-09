import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
    version: 2,
    tables: [
        tableSchema({
            name: 'product_categories',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'image_url', type: 'string', isOptional: true },
                { name: 'background_color', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'products',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'price', type: 'string' },
                { name: 'image_url', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'category_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'customers',
            columns: [
                { name: 'first_name', type: 'string' },
                { name: 'last_name', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'credits',
            columns: [
                { name: 'customer_id', type: 'string' },

                { name: 'status', type: 'string' },

                { name: 'total_amount', type: 'number' },
                { name: 'paid_amount', type: 'number' },

                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'credit_items',
            columns: [
                { name: 'credit_id', type: 'string' },
                { name: 'product_id', type: 'string' },

                { name: 'quantity', type: 'number' },
                { name: 'price_at_purchase', type: 'number' },
                { name: 'subtotal', type: 'number' },

                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),
        tableSchema({
            name: 'payments',
            columns: [
                { name: 'credit_id', type: 'string' },

                { name: 'amount', type: 'number' },
                { name: 'note', type: 'string', isOptional: true },

                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'image_upload_queue',
            columns: [
                { name: 'reference_table', type: 'string' },
                { name: 'reference_id', type: 'string' },
                { name: 'local_uri', type: 'string' },

                { name: 'status', type: 'string' },

                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ],
        }),
    ],
})