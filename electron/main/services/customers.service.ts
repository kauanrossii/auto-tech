import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { getDatabaseConnection } from "../database/database"
import { Customer } from "../entities/customer"
import * as schema from "../database/schema"
import { and, like, SQL } from "drizzle-orm"
import { PaginatedResultDto } from "@shared/interfaces/paginated-result.dto"
import { CreateCustomerDto } from "@shared/interfaces/customers/create-customer.dto"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"
import { CustomersRepository } from "../database/repositories/customers.repository"

class CustomersService {
   private readonly _database: BetterSQLite3Database<typeof schema>
   private readonly _customersRepository: CustomersRepository

   public constructor() {
      this._database = getDatabaseConnection()
      this._customersRepository = new CustomersRepository()
   }

   async getById(id: number): Promise<Customer> {
      return await this._customersRepository.getByIdAsync(id)
   }

   async getByName(name: string): Promise<Customer> {
      return await this._customersRepository.getByNameAsync(name)
   }

   async getByGovIdentifier(govIdentifier: string): Promise<Customer> {
      return await this._customersRepository.getByGovIdentifierAsync(
         govIdentifier
      )
   }

   async getByGovDocument(govDocument: string): Promise<Customer> {
      return await this._customersRepository.getByGovDocumentAsync(govDocument)
   }

   async getPaginated(
      page: number,
      quantity: number,
      filters?: { name?: string; govIdentifier?: string; cellphone?: string }
   ): Promise<PaginatedResultDto<Customer>> {
      const where: SQL[] = []

      if (filters) {
         if (filters.name)
            where.push(like(schema.customers.name, `%${filters.name}%`))

         if (filters.govIdentifier)
            where.push(
               like(
                  schema.customers.govIdentifier,
                  `%${filters.govIdentifier}%`
               )
            )

         if (filters.cellphone)
            where.push(
               like(schema.customers.cellphone, `%${filters.cellphone}%`)
            )
      }

      const totalItems = await this._database.$count(
         schema.customers,
         and(...where)
      )

      const items = (await this._database
         .select({
            id: schema.customers.id,
            name: schema.customers.name,
            type: schema.customers.type,
            govIdentifier: schema.customers.govIdentifier,
            cellphone: schema.customers.cellphone,
         })
         .from(schema.customers)
         .where(and(...where))
         .offset(quantity * (page - 1))
         .limit(quantity)) as Customer[]

      return {
         items,
         totalItems,
      }
   }

   async insert(createCustomerDto: CreateCustomerDto): Promise<number> {
      return this._database.transaction((transaction) => {
         let addressId = null
         if (createCustomerDto.address.cep) {
            const addressResult = transaction
               .insert(schema.addresses)
               .values(createCustomerDto.address)
               .returning({ id: schema.addresses.id })
               .run()
            addressId = addressResult.lastInsertRowid
         }

         const customerResult = transaction
            .insert(schema.customers)
            .values({ ...createCustomerDto, addressId })
            .returning({ id: schema.customers.id, name: schema.customers.name })
            .run()

         return customerResult.lastInsertRowid as number
      })
   }

   async update(
      id: number,
      updateCustomerDto: UpdateCustomerDto
   ): Promise<void> {
      const customer = await this.getById(id)
      const previousAddressId = customer.addressId

      customer.updateInformations(
         updateCustomerDto.type,
         updateCustomerDto.name,
         updateCustomerDto.govIdentifier,
         updateCustomerDto.govDocument,
         updateCustomerDto.cellphone,
         updateCustomerDto.phone,
         updateCustomerDto.email
      )
      customer.updateAddress(updateCustomerDto.address)

      this._customersRepository.save(customer, previousAddressId)
   }

   async delete(id: number): Promise<void> {
      const customer = await this.getById(id)
      this._database.transaction((transaction) => {
         this._customersRepository.delete(customer, transaction)
      })
   }
}

export default new CustomersService()
