import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { getDatabaseConnection } from "../database/database";
import { OrderOfService } from "../entities/orderOfService";
import { and, eq, like, SQL } from "drizzle-orm";
import * as schema from "../database/schema";

export class OrdersOfServiceService {
    private readonly _database: BetterSQLite3Database<typeof schema>;

    public constructor() {
        this._database = getDatabaseConnection();
    }

    async getById(id: number): Promise<OrderOfService> {
        return await this._database
            .query
            .ordersOfService
            .findFirst({
                where: eq(schema.ordersOfService.id, id),
                with: {
                    parts: true,
                    services: true
                }
            });
    }

    async getPaginated(quantity: number, page: number, filters?: { customerName?: string, vehicleName?: string, startDate?: Date, endDate?: Date }): Promise<OrderOfService[]> {
        const where: SQL[] = [];
        where.push(eq(schema.ordersOfService.active, true));

        if (filters) {
            if (filters.customerName) where.push(like(schema.customers.name, `%${filters.customerName}%`));

            if (filters.vehicleName) where.push(like(schema.vehicles.name, `%${filters.vehicleName}%`));
        }

        return await this._database
            .query
            .ordersOfService
            .findMany({
                columns: {
                    id: true,
                    date: true,
                    totalValue: true
                },
                where: and(...where),
                with: {
                    customer: {
                        columns: { name: true }
                    },
                    vehicle: {
                        columns: { name: true }
                    }
                },
                offset: quantity * (page - 1),
                limit: quantity
            }) as unknown as OrderOfService[];
    }

    async insert(orderOfService: OrderOfService): Promise<number> {
        orderOfService.totalValue += orderOfService.parts.reduce((total, part) => total + part.price, 0);
        orderOfService.totalValue += orderOfService.services.reduce((total, service) => total + service.price, 0);

        return await this._database.transaction(async (transaction) => {
            await transaction
                .insert(schema.parts)
                .values(orderOfService.parts);

            await transaction
                .insert(schema.services)
                .values(orderOfService.services);

            const orderOfServiceResult = await transaction
                .insert(schema.ordersOfService)
                .values(orderOfService)
                .returning({ id: schema.ordersOfService.id });

            return orderOfServiceResult[0].id;
        })
    }

    async delete(id: number): Promise<void> {
        await this._database
            .update(schema.ordersOfService)
            .set({ active: false } as any)
            .where(eq(schema.ordersOfService.id, id));
    }

    // async update(orderOfService: OrderOfService): Promise<void> {
    //     orderOfService.totalValue += orderOfService.parts.reduce((total, part) => total + part.price, 0);
    //     orderOfService.totalValue += orderOfService.services.reduce((total, service) => total + service.price, 0);
        
    //     await this._database.transaction(async (transaction) => {
    //         const sqlChunks: SQL[] = [];
    //         sqlChunks.push(sql`(case`);

    //         orderOfService.parts.forEach((part) => {
    //             sqlChunks.push(sql`when ${schema.parts.id} = ${part.id} then ${part}`);
    //         })

    //         await transaction
    //             .update(schema.parts)
    //             .set({ })
    //             .where()

    //         await transaction
    //             .insert(schema.services)
    //             .values(orderOfService.services);

    //         const orderOfServiceResult = await transaction
    //             .insert(schema.ordersOfService)
    //             .values(orderOfService)
    //             .returning({ id: schema.ordersOfService.id });

    //         return orderOfServiceResult[0].id;
    //     })
    // }
};
