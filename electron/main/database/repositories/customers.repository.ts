import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { getDatabaseConnection } from "../database"
import * as schema from "../schema"
import { eq, ExtractTablesWithRelations, like } from "drizzle-orm"
import { Customer } from "../../entities/customer"
import { plainToInstance } from "class-transformer"
import Database from "better-sqlite3"
import { SQLiteTransaction } from "drizzle-orm/sqlite-core"

type Transaction = SQLiteTransaction<
   "sync",
   Database.RunResult,
   typeof schema,
   ExtractTablesWithRelations<typeof schema>
>

export class CustomersRepository {
   private readonly _database: BetterSQLite3Database<typeof schema>

   public constructor() {
      this._database = getDatabaseConnection()
   }

   private getDb(transaction?: any): any {
      return transaction || this._database
   }

   async getByIdAsync(id: number): Promise<Customer | null> {
      const customerData = await this._database.query.customers.findFirst({
         where: eq(schema.customers.id, id),
      })

      if (!customerData) {
         return null
      }

      let addressData = null
      if (customerData.addressId) {
         addressData = await this._database.query.addresses.findFirst({
            where: eq(schema.addresses.id, customerData.addressId),
         })
      }

      return plainToInstance(
         Customer,
         { ...customerData, address: addressData ?? null },
         { excludeExtraneousValues: true }
      )
   }

   async getByNameAsync(name: string): Promise<Customer | null> {
      const customerData = await this._database.query.customers.findFirst({
         where: like(schema.customers.name, `%${name}%`),
      })
      if (!customerData) {
         return null
      }

      let addressData = null
      if (customerData.addressId) {
         addressData = await this._database.query.addresses.findFirst({
            where: eq(schema.addresses.id, customerData.addressId),
         })
      }

      return plainToInstance(
         Customer,
         { ...customerData, address: addressData ?? null },
         { excludeExtraneousValues: true }
      )
   }

   async getByGovIdentifierAsync(
      govIdentifier: string
   ): Promise<Customer | null> {
      const customerData = await this._database.query.customers.findFirst({
         where: eq(schema.customers.govIdentifier, govIdentifier),
      })
      if (!customerData) {
         return null
      }

      let addressData = null
      if (customerData.addressId) {
         addressData = await this._database.query.addresses.findFirst({
            where: eq(schema.addresses.id, customerData.addressId),
         })
      }

      return plainToInstance(
         Customer,
         { ...customerData, address: addressData ?? null },
         { excludeExtraneousValues: true }
      )
   }

   async getByGovDocumentAsync(
      govIdentifier: string
   ): Promise<Customer | null> {
      const customerData = await this._database.query.customers.findFirst({
         where: eq(schema.customers.govIdentifier, govIdentifier),
      })
      if (!customerData) {
         return null
      }

      let addressData = null
      if (customerData.addressId) {
         addressData = await this._database.query.addresses.findFirst({
            where: eq(schema.addresses.id, customerData.addressId),
         })
      }

      return plainToInstance(
         Customer,
         { ...customerData, address: addressData ?? null },
         { excludeExtraneousValues: true }
      )
   }

   update(customer: Partial<Customer>, transaction?: Transaction): void {
      const db = this.getDb(transaction)
      db.update(schema.customers)
         .set(customer)
         .where(eq(schema.customers.id, customer.id))
         .run()
   }

   save(customer: Customer, previousAddressId: number | null): void {
      this._database.transaction((tx) => {
         if (customer.address?.id) {
            tx.update(schema.addresses)
               .set({
                  cep: customer.address.cep,
                  uf: customer.address.uf,
                  city: customer.address.city,
                  district: customer.address.district,
                  street: customer.address.street,
                  unit: customer.address.unit,
               })
               .where(eq(schema.addresses.id, customer.address.id))
               .run()
         } else if (customer.address) {
            const result = tx
               .insert(schema.addresses)
               .values({
                  cep: customer.address.cep,
                  uf: customer.address.uf,
                  city: customer.address.city,
                  district: customer.address.district,
                  street: customer.address.street,
                  unit: customer.address.unit,
               })
               .returning({ id: schema.addresses.id })
               .get()
            customer.addressId = result.id
         }

         tx.update(schema.customers)
            .set({
               type: customer.type,
               name: customer.name,
               govIdentifier: customer.govIdentifier,
               govDocument: customer.govDocument,
               cellphone: customer.cellphone,
               phone: customer.phone,
               email: customer.email,
               addressId: customer.addressId,
            })
            .where(eq(schema.customers.id, customer.id))
            .run()

         if (!customer.address && previousAddressId) {
            tx.delete(schema.addresses)
               .where(eq(schema.addresses.id, previousAddressId))
               .run()
         }
      })
   }

   delete(customer: Customer, transaction?: Transaction): void {
      const db = this.getDb(transaction)
      db.delete(schema.customers)
         .where(eq(schema.customers.id, customer.id))
         .returning({ addressId: schema.customers.addressId })
         .run()

      if (customer.addressId) {
         db.delete(schema.addresses)
            .where(eq(schema.addresses.id, customer.addressId))
            .run()
      }
   }
}
