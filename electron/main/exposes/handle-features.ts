import { CreateVehicleDto } from "@shared/interfaces/vehicles/create-vehicle.dto"
import { SearchCustomersDto } from "@shared/interfaces/customers/search-customers.dto"
import { SearchVehiclesDto } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { Customer } from "../entities/customer"
import { Vehicle } from "../entities/vehicle"
import customersService from "../services/customers.service"
import vehiclesService from "../services/vehicles.service"
import { CreateCustomerDto } from "@shared/interfaces/customers/create-customer.dto"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"

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

   ipcMain.handle("getCustomerByName", async (event, name: string) => {
      return await customersService.getByName(name)
   })

   ipcMain.handle(
      "getCustomerByGovIdentifier",
      async (event, govIdentifier: string) => {
         return await customersService.getByGovIdentifier(govIdentifier)
      }
   )

   ipcMain.handle(
      "getCustomerByGovDocument",
      async (event, govDocument: string) => {
         return await customersService.getByGovDocument(govDocument)
      }
   )

   ipcMain.handle(
      "createCustomer",
      async (event, createCustomerDto: CreateCustomerDto) => {
         return await customersService.insert(createCustomerDto)
      }
   )

   ipcMain.handle(
      "updateCustomer",
      async (event, id: number, customer: UpdateCustomerDto) => {
         return await customersService.update(id, customer)
      }
   )

   ipcMain.handle("deleteCustomer", async (event, id: number) => {
      return await customersService.delete(id)
   })

   //#endregion
}
