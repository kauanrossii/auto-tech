import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { getDatabaseConnection } from "../database/database"
import * as schema from "../database/schema"
import { Address } from "../entities/address"

class AddressesService {
   private readonly _database: BetterSQLite3Database<typeof schema>

   public constructor() {
      this._database = getDatabaseConnection()
   }

   async insertAsync(address: Address): Promise<Address> {
      const result = this._database
         .insert(schema.addresses)
         .values(address)
         .returning({ id: schema.addresses.id })
         .get()
      address.id = result.id
      return address
   }
}

export default new AddressesService()
