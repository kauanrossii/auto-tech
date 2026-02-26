import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"
import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"
import { SearchCustomersDto } from "@shared/interfaces/search-customers.dto"
import { Vehicle } from "electron/main/entities/vehicle"
import { Customer } from "electron/main/entities/customer"

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
      updateCustomer: (customer: Customer) =>
         ipcRenderer.invoke("updateCustomer", customer),
      deleteCustomer: (id: number) => ipcRenderer.invoke("deleteCustomer", id),
      getCustomerById: (id: number) =>
         ipcRenderer.invoke("getCustomerById", id),
   })
}
