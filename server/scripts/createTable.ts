import { db } from '../config/database';

async function createTable(): Promise<void> {
    try {
        const tableExists = await db.schema.hasTable('newsPosts');
        
        if (tableExists) {
            console.log('Table "newsPosts" already exists!');
            return;
        }

        await db.schema.createTable('newsPosts', (table) => {
            table.increments('id').primary();
            table.text('title').notNullable();
            table.text('text').notNullable();
            table.timestamp('created_date').defaultTo(db.fn.now());
        });

        console.log('Table "newsPosts" created successfully!');
    } catch (error: any) {
        console.error('Error creating table:', error.message);
    } finally {
        await db.destroy();
    }
}

createTable();
