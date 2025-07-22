import { Fuel } from "@shared/enums/fuel"

export interface VehicleForm {
   id: number | null
   model: string | null
   brand: string | null
   plate: string | null
   year: number | null
   fuel: Fuel | null
   lastMileage: number | null
   color: string | null
   chassi: string | null
}
