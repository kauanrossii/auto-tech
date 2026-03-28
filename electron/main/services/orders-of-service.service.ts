import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { getDatabaseConnection } from "../database/database"
import { OrderOfService } from "../entities/orderOfService"
import { and, count, eq, like, SQL } from "drizzle-orm"
import * as schema from "../database/schema"
import { PaginatedResultDto } from "@shared/interfaces/paginated-result.dto"
import { OrderOfServiceListItemDto } from "@shared/interfaces/orders-of-service/order-of-service-list-item.dto"

class OrdersOfServiceService {
   private readonly _database: BetterSQLite3Database<typeof schema>

   public constructor() {
      this._database = getDatabaseConnection()
   }

   async getById(id: number): Promise<OrderOfService> {
      return await this._database.query.ordersOfService.findFirst({
         where: eq(schema.ordersOfService.id, id),
         with: {
            parts: true,
            services: true,
         },
      })
   }

   async getPaginatedAsync(
      page: number,
      quantity: number,
      filters?: { customerName?: string; vehicleName?: string }
   ): Promise<PaginatedResultDto<OrderOfServiceListItemDto>> {
      const conditions: SQL[] = [eq(schema.ordersOfService.active, true)]

      if (filters?.customerName?.trim()) {
         conditions.push(
            like(schema.customers.name, `%${filters.customerName.trim()}%`)
         )
      }
      if (filters?.vehicleName?.trim()) {
         conditions.push(
            like(schema.vehicles.model, `%${filters.vehicleName.trim()}%`)
         )
      }

      const whereClause = and(...conditions)

      const baseQuery = () =>
         this._database
            .select({ n: count() })
            .from(schema.ordersOfService)
            .innerJoin(
               schema.customers,
               eq(schema.ordersOfService.customerId, schema.customers.id)
            )
            .innerJoin(
               schema.vehicles,
               eq(schema.ordersOfService.vehicleId, schema.vehicles.id)
            )
            .where(whereClause)

      const [countRow] = await baseQuery()
      const totalItems = Number(countRow?.n ?? 0)

      const rows = await this._database
         .select({
            id: schema.ordersOfService.id,
            date: schema.ordersOfService.date,
            totalValue: schema.ordersOfService.totalValue,
            customerName: schema.customers.name,
            vehicleModel: schema.vehicles.model,
         })
         .from(schema.ordersOfService)
         .innerJoin(
            schema.customers,
            eq(schema.ordersOfService.customerId, schema.customers.id)
         )
         .innerJoin(
            schema.vehicles,
            eq(schema.ordersOfService.vehicleId, schema.vehicles.id)
         )
         .where(whereClause)
         .limit(quantity)
         .offset(quantity * (page - 1))

      const items: OrderOfServiceListItemDto[] = rows.map((row) => {
         const d =
            row.date instanceof Date ? row.date : new Date(row.date as number)
         return {
            id: row.id,
            dateDisplay: d.toLocaleDateString("pt-BR"),
            totalValueDisplay: row.totalValue.toLocaleString("pt-BR", {
               style: "currency",
               currency: "BRL",
            }),
            customerName: row.customerName,
            vehicleModel: row.vehicleModel,
         }
      })

      return { items, totalItems }
   }

   async insert(orderOfService: OrderOfService): Promise<number> {
      orderOfService.totalValue += orderOfService.parts.reduce(
         (total, part) => total + part.price,
         0
      )
      orderOfService.totalValue += orderOfService.services.reduce(
         (total, service) => total + service.price,
         0
      )

      return await this._database.transaction(async (transaction) => {
         await transaction.insert(schema.parts).values(orderOfService.parts)

         await transaction
            .insert(schema.services)
            .values(orderOfService.services)

         const orderOfServiceResult = await transaction
            .insert(schema.ordersOfService)
            .values(orderOfService)
            .returning({ id: schema.ordersOfService.id })

         return orderOfServiceResult[0].id
      })
   }

   async delete(id: number): Promise<void> {
      await this._database
         .update(schema.ordersOfService)
         .set({ active: false } as any)
         .where(eq(schema.ordersOfService.id, id))
   }
}

export default new OrdersOfServiceService()
