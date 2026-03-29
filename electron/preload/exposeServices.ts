import { CreateVehicleDto } from "@shared/interfaces/vehicles/create-vehicle.dto"
import { SearchVehiclesDto } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { SearchCustomersDto } from "@shared/interfaces/customers/search-customers.dto"
import { UpdateVehicleDto } from "@shared/interfaces/vehicles/update-vehicle.dto"
import { Customer } from "electron/main/entities/customer"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"
import { SearchOrdersOfServiceDto } from "@shared/interfaces/orders-of-service/search-orders-of-service.dto"
import { UpdateSystemConfigurationDto } from "@shared/interfaces/system-configurations/update-system-configuration.dto"

export function exposeServicesInMainWorld(
   contextBridge: Electron.ContextBridge,
   ipcRenderer: Electron.IpcRenderer
) {
   contextBridge.exposeInMainWorld("management", {
      listVehicles: (searchVehiclesDto: SearchVehiclesDto) =>
         ipcRenderer.invoke("listVehicles", searchVehiclesDto),
      createVehicle: (createVehicleDto: CreateVehicleDto) =>
         ipcRenderer.invoke("createVehicle", createVehicleDto),
      updateVehicle: (dto: UpdateVehicleDto) =>
         ipcRenderer.invoke("updateVehicle", dto),
      deleteVehicle: (id: number) => ipcRenderer.invoke("deleteVehicle", id),
      getVehicleById: (id: number) => ipcRenderer.invoke("getVehicleById", id),
      getVehicleByPlate: (plate: string) =>
         ipcRenderer.invoke("getVehicleByPlate", plate),

      listCustomers: (searchCustomersDto: SearchCustomersDto) =>
         ipcRenderer.invoke("listCustomers", searchCustomersDto),
      createCustomer: (customer: Customer) =>
         ipcRenderer.invoke("createCustomer", customer),
      updateCustomer: (id: number, customer: UpdateCustomerDto) =>
         ipcRenderer.invoke("updateCustomer", id, customer),
      deleteCustomer: (id: number) => ipcRenderer.invoke("deleteCustomer", id),
      getCustomerById: (id: number) =>
         ipcRenderer.invoke("getCustomerById", id),
      getCustomerByName: (name: string) =>
         ipcRenderer.invoke("getCustomerByName", name),
      getCustomerByGovIdentifier: (govIdentifier: string) =>
         ipcRenderer.invoke("getCustomerByGovIdentifier", govIdentifier),
      getCustomerByGovDocument: (govDocument: string) =>
         ipcRenderer.invoke("getCustomerByGovDocument", govDocument),

      listOrdersOfService: (dto: SearchOrdersOfServiceDto) =>
         ipcRenderer.invoke("listOrdersOfService", dto),
      deleteOrderOfService: (id: number) =>
         ipcRenderer.invoke("deleteOrderOfService", id),
      getNextOrderOfServiceId: () => ipcRenderer.invoke("getNextOrderOfServiceId"),

      getSystemConfiguration: () => ipcRenderer.invoke("getSystemConfiguration"),
      upsertSystemConfiguration: (dto: UpdateSystemConfigurationDto) =>
         ipcRenderer.invoke("upsertSystemConfiguration", dto),
   })
}
