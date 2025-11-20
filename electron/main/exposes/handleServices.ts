import vehiclesService from "../services/vehicles.service"
import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"
import { Vehicle } from "../entities/vehicle"
import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"

async function getPaginatedVehicles(
   page: number,
   quantity: number,
   filters?: { name?: string; model?: string; sign?: string }
): Promise<Vehicle[]> {
   return await vehiclesService.getPaginatedAsync(page, quantity, filters)
}

async function getVehicleById(id: number) {
   return await vehiclesService.getByIdAsync(id)
}

export function handleFeatures(ipcMain: Electron.IpcMain) {
   ipcMain.handle(
      "listVehicles",
      async (event, searchVehiclesDto: SearchVehiclesDto) => {
         return await getPaginatedVehicles(
            searchVehiclesDto.pagination.page,
            searchVehiclesDto.pagination.quantity,
            searchVehiclesDto.filters
         )
      }
   )

   ipcMain.handle("getVehicleById", async (event, id: number) => {
      return await getVehicleById(id)
   })

   ipcMain.handle(
      "createVehicle",
      async (event, createVehicleDto: CreateVehicleDto) => {
         return await vehiclesService.insertAsync(createVehicleDto)
      }
   )

   ipcMain.handle("updateVehicle", async (event, vehicle: Vehicle) => {
      return await vehiclesService.updateAsync(vehicle)
   })

   ipcMain.handle("deleteVehicle", async (event, id: number) => {
      return await vehiclesService.deleteAsync(id)
   })
}
