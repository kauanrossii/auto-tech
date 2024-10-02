import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { getDatabaseConnection } from "../database/database";
import { vehicles as vehiclesSchema } from "../database/schema";
import * as schema from "../database/schema";
import { Vehicle } from "../entities/vehicle";
import { and, eq, like, SQL } from "drizzle-orm";

export class VehiclesService {
    private readonly _database: BetterSQLite3Database<typeof schema>;

    constructor() {
        this._database = getDatabaseConnection();
    }

    async getById(id: number): Promise<Vehicle> {
        return await this._database
            .query
            .vehicles
            .findFirst({
                where: eq(vehiclesSchema.id, id)
            });
    }

    async getPaginated(page: number, quantity: number, filters?: { name?: string, model?: string, sign?: string }): Promise<Vehicle[]> {
        const where: SQL[] = [];

        if (filters) {
            if (filters.name)
                where.push(like(vehiclesSchema.name, `%${filters.name}%`));

            if (filters.model)
                where.push(like(vehiclesSchema.model, `%${filters.model}%`));

            if (filters.sign)
                where.push(like(vehiclesSchema.sign, `%${filters.sign}%`));
        }
        
        return await this._database
            .select({
                name: vehiclesSchema.name,
                model: vehiclesSchema.model,
                sign: vehiclesSchema.sign,
                year: vehiclesSchema.year
            })
            .from(vehiclesSchema)
            .where(and(...where))
            .offset(quantity * (page - 1))
            .limit(quantity) as Vehicle[];
    }

    async insert(vehicle: Vehicle): Promise<{ id: number }> {
        const insertResult = await this._database
            .insert(vehiclesSchema)
            .values(vehicle)
            .returning({ id: vehiclesSchema.id });
        return insertResult[0];
    }

    async update(vehicle: Vehicle): Promise<void> {
        await this._database
            .update(vehiclesSchema)
            .set(vehicle)
            .where(eq(vehiclesSchema.id, vehicle.id));
    }

    async delete(id: number): Promise<void> {
        const existsOrderOfServices = await this._database
            .query
            .ordersOfService
            .findFirst({
                where: eq(schema.ordersOfService.vehicleId, id)
            });

        if (existsOrderOfServices) {
            throw new Error("Cannot delete a vehicle that is linked to orders of services.");
        }

        await this._database
            .delete(vehiclesSchema)
            .where(eq(vehiclesSchema.id, id));
    }
}
