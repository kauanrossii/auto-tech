import { PaginationDto } from "../pagination.dto"

export interface SearchOrdersOfServiceFilters {
   customerName: string | null
   vehicleName: string | null
}

export interface SearchOrdersOfServiceDto {
   pagination: PaginationDto
   filters: SearchOrdersOfServiceFilters
}
