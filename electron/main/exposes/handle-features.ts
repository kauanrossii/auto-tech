import { CreateVehicleDto } from "@shared/interfaces/vehicles/create-vehicle.dto"
import { SearchCustomersDto } from "@shared/interfaces/customers/search-customers.dto"
import { SearchVehiclesDto } from "@shared/interfaces/vehicles/search-vehicles.dto"
import customersService from "../services/customers.service"
import vehiclesService from "../services/vehicles.service"
import ordersOfServiceService from "../services/orders-of-service.service"
import { SearchOrdersOfServiceDto } from "@shared/interfaces/orders-of-service/search-orders-of-service.dto"
import { CreateCustomerDto } from "@shared/interfaces/customers/create-customer.dto"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"
import { UpdateVehicleDto } from "@shared/interfaces/vehicles/update-vehicle.dto"
import systemConfigurationsService from "../services/system-configurations.service"
import { UpdateSystemConfigurationDto } from "@shared/interfaces/system-configurations/update-system-configuration.dto"

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

   ipcMain.handle("updateVehicle", async (event, dto: UpdateVehicleDto) => {
      await vehiclesService.updateAsync(dto)
   })

   ipcMain.handle("deleteVehicle", async (event, id: number) => {
      return await vehiclesService.deleteAsync(id)
   })
   //#endregion

   //#region Orders of service
   ipcMain.handle(
      "listOrdersOfService",
      async (event, dto: SearchOrdersOfServiceDto) => {
         return await ordersOfServiceService.getPaginatedAsync(
            dto.pagination.page,
            dto.pagination.quantity,
            {
               customerName: dto.filters.customerName ?? undefined,
               vehicleName: dto.filters.vehicleName ?? undefined,
            }
         )
      }
   )

   ipcMain.handle("deleteOrderOfService", async (event, id: number) => {
      await ordersOfServiceService.delete(id)
   })

   ipcMain.handle("getNextOrderOfServiceId", async () => {
      return await ordersOfServiceService.getNextId()
   })
   //#endregion

   //#region System configuration
   ipcMain.handle("getSystemConfiguration", async () => {
      return await systemConfigurationsService.getAsync()
   })

   ipcMain.handle(
      "upsertSystemConfiguration",
      async (event, dto: UpdateSystemConfigurationDto) => {
         return await systemConfigurationsService.upsertAsync(dto)
      }
   )
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
