import { CreateCustomerAddressDto } from "./create-costumer-address.dto"

export interface CreateCustomerDto {
   name: string
   type: number
   address: CreateCustomerAddressDto | null
   govIdentifier: string | null
   govDocument: string | null
   cellphone: string | null
   phone: string | null
   email: string | null
}
