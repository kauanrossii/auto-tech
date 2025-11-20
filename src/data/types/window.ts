import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"
import { Vehicle } from "../../../electron/main/entities/vehicle"
import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"

declare global {
   interface Window {
      management: {
         listVehicles: (
            searchVehiclesDto: SearchVehiclesDto
         ) => Promise<Vehicle[]>
         getVehicleById: (id: number) => Promise<Vehicle>
         createVehicle: (createVehicleDto: CreateVehicleDto) => Promise<Vehicle>
         updateVehicle: (vehicle: Vehicle) => Promise<Vehicle>
         deleteVehicle: (id: number) => Promise<void>
         abc: () => Promise<string>
      }
   }
}
