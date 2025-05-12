import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { getDatabaseConnection } from "../database/database";
import { Customer } from "../entities/customer";
import * as schema from '../database/schema';
import { and, eq, like, SQL } from "drizzle-orm";

class CustomersService {
    private readonly _database: BetterSQLite3Database<typeof schema>;

    public constructor() {
        this._database = getDatabaseConnection();
    }

    async getById(id: number): Promise<Customer> {
        const customer = await this._database
            .query
            .customers
            .findFirst({ where: eq(schema.customers.id, id) }) as Customer;

        const address = await this._database
            .query
            .addresses
            .findFirst({ where: eq(schema.addresses.id, customer.addressId) });

        customer.address = address;
        return customer;
    }

    async getPaginated(page: number, quantity: number, filters?: { name?: string, govIdentifier?: string, cellphone?: string }): Promise<Customer[]> {
        const where: SQL[] = [];

        if (filters) {
            if (filters.name) where.push(like(schema.customers.name, `%${filters.name}%`));

            if (filters.govIdentifier) where.push(like(schema.customers.govIdentifier, `%${filters.govIdentifier}%`));

            if (filters.cellphone) where.push(like(schema.customers.cellphone, `%${filters.cellphone}%`));
        }

        return await this._database
            .select({
                name: schema.customers.name,
                type: schema.customers.type,
                govIdentifier: schema.customers.govIdentifier,
                cellphone: schema.customers.cellphone
            })
            .from(schema.customers)
            .where(and(...where))
            .offset(quantity * (page - 1))
            .limit(quantity) as Customer[];
    }

    async insert(customer: Customer): Promise<number> {
        const customerId = await this._database.transaction(async (transaction) => {
            const addressResult = await transaction
                .insert(schema.addresses)
                .values(customer.address)
                .returning({ id: schema.addresses.id });

            customer.addressId = addressResult[0].id;

            const customerResult = await this._database
                .insert(schema.customers)
                .values(customer)
                .returning({ id: schema.customers.id });
            return customerResult[0].id;
        })
        return customerId;
    }

    async update(customer: Customer): Promise<void> {
        await this._database.transaction(async (transaction) => {
            await transaction
                .update(schema.addresses)
                .set(customer.address)
                .where(eq(schema.addresses.id, customer.addressId));

            await transaction
                .update(schema.customers)
                .set(customer)
                .where(eq(schema.customers.id, customer.id));
        })
    }

    async delete(id: number): Promise<void> {
        await this._database.transaction(async (transaction) => {
            const deleteResult = await transaction
                .delete(schema.customers)
                .where(eq(schema.customers.id, id))
                .returning({ addressId: schema.customers.addressId });

            const addressId = deleteResult[0].addressId;

            await transaction
                .delete(schema.addresses)
                .where(eq(schema.addresses.id, addressId));
        })
    }
}

export default new CustomersService();