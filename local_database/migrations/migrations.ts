import {
    schemaMigrations,
    createTable,
} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                createTable({
                    name: 'product_categories',
                    columns: [
                         { name: 'name', type: 'string' },
                        { name: 'description', type: 'string', isOptional: true },
                        { name: 'imageUrl', type: 'string', isOptional: true },
                        { name: 'backgroundColor', type: 'string' },
                        { name: 'createdAt', type: 'number' },
                        { name: 'updatedAt', type: 'number' },
                        { name: 'deletedAt', type: 'number', isOptional: true },
                    ],
                }),

                createTable({
                    name: 'products',
                    columns: [
                         { name: 'name', type: 'string' },
                        { name: 'description', type: 'string', isOptional: true },
                        { name: 'price', type: 'string' },
                        { name: 'imageUrls', type: 'string' },
                        { name: 'status', type: 'string' },
                        { name: 'categoryId', type: 'number' },
                        { name: 'createdAt', type: 'number' },
                        { name: 'updatedAt', type: 'number' },
                        { name: 'deletedAt', type: 'number', isOptional: true },
                    ],
                }),

                createTable({
                    name: 'users',
                    columns: [
                         { name: 'firstname', type: 'string' },
                        { name: 'lastname', type: 'string' },
                        { name: 'email', type: 'string' },
                        { name: 'role', type: 'string' },
                        { name: 'createdAt', type: 'number' },
                        { name: 'updatedAt', type: 'number' },
                        { name: 'deletedAt', type: 'number', isOptional: true },
                    ],
                }),

                createTable({
                    name: 'credits',
                    columns: [
                        { name: 'customerId', type: 'number' },
                        { name: 'productId', type: 'number' },
                        { name: 'quantity', type: 'number' },
                        { name: 'status', type: 'string' },
                        { name: 'priceAtPurchase', type: 'string' },
                        { name: 'paidAt', type: 'number', isOptional: true },
                        { name: 'createdAt', type: 'number' },
                        { name: 'updatedAt', type: 'number' },
                        { name: 'deletedAt', type: 'number', isOptional: true },
                    ],
                }),
            ],
        },
    ],
})