import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { getDatabaseConnection } from "../database"
import * as schema from "../schema"
import { Address } from "../../entities/address"
import { eq } from "drizzle-orm"

type DatabaseOrTransaction =
   | BetterSQLite3Database<typeof schema>
   | ReturnType<BetterSQLite3Database<typeof schema>["transaction"]>

export class AddressesRepository {
   private readonly _database: BetterSQLite3Database<typeof schema>

   public constructor() {
      this._database = getDatabaseConnection()
   }

   private getDb(transaction?: any): any {
      return transaction || this._database
   }

   insert(address: Address, transaction?: any): Address {
      const db = this.getDb(transaction)
      const result = db
         .insert(schema.addresses)
         .values(address)
         .returning({ id: schema.addresses.id })
         .get()
      address.id = result.id
      return address
   }

   update(address: Partial<Address>, transaction?: any): void {
      const db = this.getDb(transaction)
      db.update(schema.addresses)
         .set(address)
         .where(eq(schema.addresses.id, address.id))
         .run()
   }

   delete(id: number, transaction?: any): void {
      const db = this.getDb(transaction)
      db.delete(schema.addresses).where(eq(schema.addresses.id, id)).run()
   }
}
