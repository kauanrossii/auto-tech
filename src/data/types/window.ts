import { Vehicle } from "../../../electron/main/entities/vehicle"

declare global {
   interface Window {
      management: {
         listVehicles: (
            page: number,
            quantity: number,
            filters?: { name?: string; model?: string; sign?: string }
         ) => Promise<Vehicle[]>
         getVehicleById: (id: number) => Promise<Vehicle>
         createVehicle: (vehicle: Vehicle) => Promise<Vehicle>
         updateVehicle: (vehicle: Vehicle) => Promise<Vehicle>
         deleteVehicle: (id: number) => Promise<void>
      }
   }
}
