import { PaginationDto } from "./pagination.dto"

interface SearchCustomersDto {
   pagination: PaginationDto
   filters: SearchCustomersFilters
}

interface SearchCustomersFilters {
   name?: string | null
   govIdentifier?: string | null
   cellphone?: string | null
}

export type { SearchCustomersDto, SearchCustomersFilters }
