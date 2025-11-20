import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"
import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"

export function exposeServicesInMainWorld(
   contextBridge: Electron.ContextBridge,
   ipcRenderer: Electron.IpcRenderer
) {
   contextBridge.exposeInMainWorld("management", {
      listVehicles: (searchVehiclesDto: SearchVehiclesDto) =>
         ipcRenderer.invoke("listVehicles", searchVehiclesDto),
      createVehicle: (createVehicleDto: CreateVehicleDto) =>
         ipcRenderer.invoke("createVehicle", createVehicleDto),
      getVehicleById: (id: number) => ipcRenderer.invoke("getVehicleById", id),
   })
}
