import { Expose, Type } from "class-transformer"
import { Address } from "./address"
import { Person } from "./person.enum"

export class Customer {
   @Expose()
   id: number

   @Expose()
   addressId: number | null

   @Expose()
   type: Person

   @Expose()
   name: string

   @Expose()
   govIdentifier: string | null

   @Expose()
   govDocument: string | null

   @Expose()
   cellphone: string | null

   @Expose()
   phone: string | null

   @Expose()
   email: string | null

   @Expose()
   @Type(() => Address)
   address: Address | null

   updateInformations(
      type: Person,
      name: string,
      govIdentifier: string | null,
      govDocument: string | null,
      cellphone: string | null,
      phone: string | null,
      email: string | null
   ): void {
      this.type = type
      this.name = name
      this.govIdentifier = govIdentifier
      this.govDocument = govDocument
      this.cellphone = cellphone
      this.phone = phone
      this.email = email
   }

   updateAddress(
      addressData: {
         cep: string | null
         uf: string | null
         city: string | null
         district: string | null
         street: string | null
         unit: string | null
      } | null
   ): void {
      if (!addressData?.cep) {
         this.removeAddress()
         return
      }

      if (this.address) {
         this.address.updateInformations(
            addressData.cep,
            addressData.uf,
            addressData.city,
            addressData.district,
            addressData.street,
            addressData.unit
         )
      } else {
         const address = new Address()
         address.cep = addressData.cep
         address.uf = addressData.uf
         address.city = addressData.city
         address.district = addressData.district
         address.street = addressData.street
         address.unit = addressData.unit
         this.address = address
      }
   }

   removeAddress(): void {
      this.address = null
      this.addressId = null
   }
}
