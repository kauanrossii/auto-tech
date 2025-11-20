import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { getDatabaseConnection } from "../database/database"
import { vehicles as vehiclesSchema } from "../database/schema"
import * as schema from "../database/schema"
import { Vehicle } from "../entities/vehicle"
import { and, eq, like, SQL } from "drizzle-orm"
import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"

class VehiclesService {
   private readonly _database: BetterSQLite3Database<typeof schema>

   constructor() {
      this._database = getDatabaseConnection()
   }

   async getByIdAsync(id: number): Promise<Vehicle> {
      return await this._database.query.vehicles.findFirst({
         where: eq(vehiclesSchema.id, id),
      })
   }

   async getPaginatedAsync(
      page: number,
      quantity: number,
      filters?: { model?: string; brand?: string; plate?: string }
   ): Promise<Vehicle[]> {
      const where: SQL[] = []

      if (filters) {
         if (filters.model)
            where.push(like(vehiclesSchema.model, `%${filters.model}%`))

         if (filters.brand)
            where.push(like(vehiclesSchema.brand, `%${filters.brand}%`))

         if (filters.plate)
            where.push(like(vehiclesSchema.plate, `%${filters.plate}%`))
      }

      return (await this._database
         .select({
            id: vehiclesSchema.id,
            model: vehiclesSchema.model,
            brand: vehiclesSchema.brand,
            plate: vehiclesSchema.plate,
            year: vehiclesSchema.year,
         })
         .from(vehiclesSchema)
         .where(and(...where))
         .offset(quantity * (page - 1))
         .limit(quantity)) as Vehicle[]
   }

   async insertAsync(
      createVehicleDto: CreateVehicleDto
   ): Promise<{ id: number }> {
      const insertResult = await this._database
         .insert(vehiclesSchema)
         .values({ ...createVehicleDto })
         .returning({ id: vehiclesSchema.id })
      return insertResult[0]
   }

   async updateAsync(vehicle: Vehicle): Promise<void> {
      await this._database
         .update(vehiclesSchema)
         .set(vehicle)
         .where(eq(vehiclesSchema.id, vehicle.id))
   }

   async deleteAsync(id: number): Promise<void> {
      const existsOrderOfServices =
         await this._database.query.ordersOfService.findFirst({
            where: eq(schema.ordersOfService.vehicleId, id),
         })

      if (existsOrderOfServices) {
         throw new Error(
            "Cannot delete a vehicle that is linked to orders of services."
         )
      }

      await this._database
         .delete(vehiclesSchema)
         .where(eq(vehiclesSchema.id, id))
   }
}

export default new VehiclesService()
