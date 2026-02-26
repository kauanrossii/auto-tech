import { Expose } from "class-transformer"

export class Address {
   @Expose()
   id: number

   @Expose()
   cep: string

   @Expose()
   uf: string | null

   @Expose()
   city: string | null

   @Expose()
   district: string | null

   @Expose()
   street: string | null

   @Expose()
   unit: string | null

   updateInformations(
      cep: string,
      uf: string | null,
      city: string | null,
      district: string | null,
      street: string | null,
      unit: string | null
   ): void {
      this.cep = cep
      this.uf = uf
      this.city = city
      this.district = district
      this.street = street
      this.unit = unit
   }
}
