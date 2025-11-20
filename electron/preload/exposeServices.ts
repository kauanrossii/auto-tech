import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"
import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"
import { Vehicle } from "electron/main/entities/vehicle"

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
   })
}
