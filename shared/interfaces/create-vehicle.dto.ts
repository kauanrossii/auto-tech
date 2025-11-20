export interface CreateVehicleDto {
   model: string
   brand: string
   plate: string
   year: number
   fuel: number | null
   lastMileage: number | null
   color: string | null
   chassi: string | null
}
