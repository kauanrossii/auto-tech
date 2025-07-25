import { relations } from "drizzle-orm"
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const addresses = sqliteTable("addresses", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   cep: text("cep").notNull(),
   uf: text("uf"),
   city: text("city"),
   district: text("district"),
   street: text("street"),
   unit: text("unit"),
})

export const customers = sqliteTable("customers", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   addressId: integer("addressId")
      .references(() => addresses.id)
      .notNull(),
   type: integer("type").notNull(),
   name: text("name").notNull(),
   govIdentifier: text("govIdentifier"),
   govDocument: text("govDocument"),
   cellphone: text("cellphone"),
   phone: text("phone"),
   email: text("email"),
})

export const customersRelations = relations(customers, ({ one }) => ({
   address: one(addresses, {
      fields: [customers.addressId],
      references: [addresses.id],
   }),
}))

export const vehicles = sqliteTable("vehicles", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   model: text("model").notNull(),
   brand: text("brand").notNull(),
   plate: text("plate").notNull(),
   year: integer("year").notNull(),
   fuel: integer("fuel"),
   lastMileage: integer("lastMileage"),
   color: text("color"),
   chassi: text("chassi"),
})

export const parts = sqliteTable("parts", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   orderOfServiceId: integer("orderOfServiceId")
      .references(() => ordersOfService.id)
      .notNull(),
   name: text("name").notNull(),
   price: real("price").notNull(),
})

export const partsRelations = relations(parts, ({ one }) => ({
   orderOfService: one(ordersOfService, {
      fields: [parts.orderOfServiceId],
      references: [ordersOfService.id],
   }),
}))

export const services = sqliteTable("services", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   orderOfServiceId: integer("orderOfServiceId")
      .references(() => ordersOfService.id)
      .notNull(),
   description: text("name").notNull(),
   price: real("price").notNull(),
})

export const servicesRelations = relations(services, ({ one }) => ({
   orderOfService: one(ordersOfService, {
      fields: [services.orderOfServiceId],
      references: [ordersOfService.id],
   }),
}))

export const ordersOfService = sqliteTable("ordersOfService", {
   id: integer("id").primaryKey({ autoIncrement: true }),
   customerId: integer("customerId")
      .references(() => customers.id)
      .notNull(),
   vehicleId: integer("vehicleId")
      .references(() => vehicles.id)
      .notNull(),
   date: integer("date", { mode: "timestamp" }).notNull(),
   totalValue: real("totalValue").notNull(),
   active: integer("active", { mode: "boolean" }).default(true).notNull(),
   mileage: integer("mileage"),
   paymentModel: integer("paymentModel"),
   observation: text("observation"),
})

export const orderOfServiceRelations = relations(
   ordersOfService,
   ({ one, many }) => ({
      parts: many(parts),
      services: many(services),
      vehicle: one(vehicles, {
         fields: [ordersOfService.id],
         references: [vehicles.id],
      }),
      customer: one(customers, {
         fields: [ordersOfService.customerId],
         references: [customers.id],
      }),
   })
)
