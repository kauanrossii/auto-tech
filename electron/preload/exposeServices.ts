import { CreateVehicleDto } from "@shared/interfaces/vehicles/create-vehicle.dto"
import { SearchVehiclesDto } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { SearchCustomersDto } from "@shared/interfaces/customers/search-customers.dto"
import { Vehicle } from "electron/main/entities/vehicle"
import { Customer } from "electron/main/entities/customer"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"

export function exposeServicesInMainWorld(
   contextBridge: Electron.ContextBridge,
   ipcRenderer: Electron.IpcRenderer
) {
   contextBridge.exposeInMainWorld("management", {
      listVehicles: (searchVehiclesDto: SearchVehiclesDto) =>
         ipcRenderer.invoke("listVehicles", searchVehiclesDto),
      createVehicle: (createVehicleDto: CreateVehicleDto) =>
         ipcRenderer.invoke("createVehicle", createVehicleDto),
      updateVehicle: (vehicle: Vehicle) =>
         ipcRenderer.invoke("updateVehicle", vehicle),
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
   })
}
