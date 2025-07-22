import { PaginationDto } from "./pagination.dto"

interface SearchVehiclesDto {
   pagination: PaginationDto
   filters: SearchVehiclesFilters
}

interface SearchVehiclesFilters {
   name: string | null
   model: string | null
   sign: string | null
}

export type { SearchVehiclesDto, SearchVehiclesFilters }
