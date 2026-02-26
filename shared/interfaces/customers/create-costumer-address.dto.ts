export interface CreateCustomerAddressDto {
   id: number | null
   cep: string
   uf: string | null
   city: string | null
   district: string | null
   street: string | null
   unit: string | null
}
