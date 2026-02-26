import { CreateCustomerDto } from "./create-customer.dto"
import { UpdateCustomerAddressDto } from "./update-customer-address.dto"

export interface UpdateCustomerDto extends CreateCustomerDto {
   id: number
   address: UpdateCustomerAddressDto | null
}
