import { Address } from "./address"
import { Person } from "./person.enum"

export class Customer {
   id: number
   addressId: number | null

   public constructor(
      public address: Address | null,
      public type: Person,
      public name: string,
      public govIdentifier: string | null,
      public govDocument: string | null,
      public cellphone: string | null,
      public phone: string | null,
      public email: string | null
   ) {}
}
