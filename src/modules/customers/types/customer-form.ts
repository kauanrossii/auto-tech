import { AddressForm } from "@src/modules/address/types/address-form"

export interface CustomerForm {
   id: number | null
   name: string
   type: number | null
   address: AddressForm | null
   govIdentifier: string | null
   govDocument: string | null
   cellphone: string | null
   phone: string | null
   email: string | null
}
