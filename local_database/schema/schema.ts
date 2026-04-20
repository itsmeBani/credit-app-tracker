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
                { name: 'image_urls', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'category_id', type: 'number' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'users',
            columns: [
                { name: 'first_name', type: 'string' },
                { name: 'last_name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'role', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),

        tableSchema({
            name: 'credits',
            columns: [
                { name: 'customer_id', type: 'number' },
                { name: 'product_id', type: 'number' },
                { name: 'quantity', type: 'number' },
                { name: 'status', type: 'string' },
                { name: 'price_at_purchase', type: 'string' },
                { name: 'paid_at', type: 'number', isOptional: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number', isOptional: true },
            ],
        }),
    ],
})