import { VehicleBrands } from "@shared/enums/vehicle-brands"

export interface CreateVehicleDto {
   model: string
   brand: VehicleBrands
   plate: string
   year: number
   fuel: number | null
   lastMileage: number | null
   color: string | null
   chassi: string | null
}
