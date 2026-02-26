import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"
import { SearchCustomersDto } from "@shared/interfaces/search-customers.dto"
import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"
import { Customer } from "../entities/customer"
import { Vehicle } from "../entities/vehicle"
import customersService from "../services/customers.service"
import vehiclesService from "../services/vehicles.service"

export function handleFeatures(ipcMain: Electron.IpcMain) {
   //#region Vehicles
   ipcMain.handle(
      "listVehicles",
      async (event, searchVehiclesDto: SearchVehiclesDto) => {
         return await vehiclesService.getPaginatedAsync(
            searchVehiclesDto.pagination.page,
            searchVehiclesDto.pagination.quantity,
            searchVehiclesDto.filters
         )
      }
   )

   ipcMain.handle("getVehicleById", async (event, id: number) => {
      return await vehiclesService.getByIdAsync(id)
   })

   ipcMain.handle("getVehicleByPlate", async (event, plate: string) => {
      return await vehiclesService.getByPlateAsync(plate)
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
   //#endregion

   //#region Customers
   ipcMain.handle(
      "listCustomers",
      async (event, searchCustomersDto: SearchCustomersDto) => {
         return await customersService.getPaginated(
            searchCustomersDto.pagination.page,
            searchCustomersDto.pagination.quantity,
            searchCustomersDto.filters
         )
      }
   )

   ipcMain.handle("getCustomerById", async (event, id: number) => {
      return await customersService.getById(id)
   })

   ipcMain.handle("createCustomer", async (event, customer: Customer) => {
      return await customersService.insert(customer)
   })

   ipcMain.handle("updateCustomer", async (event, customer: Customer) => {
      return await customersService.update(customer)
   })

   ipcMain.handle("deleteCustomer", async (event, id: number) => {
      return await customersService.delete(id)
   })

   //#endregion
}
