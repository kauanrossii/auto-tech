import { CreateCustomerAddressDto } from "./create-costumer-address.dto"

export interface UpdateCustomerAddressDto extends CreateCustomerAddressDto {
   id: number | null
}
