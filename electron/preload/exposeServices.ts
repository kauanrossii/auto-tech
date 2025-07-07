export function exposeServicesInMainWorld(
   contextBridge: Electron.ContextBridge,
   ipcRenderer: Electron.IpcRenderer
) {
   contextBridge.exposeInMainWorld("management", {
      listVehicles: (
         page: number,
         quantity: number,
         filters?: { name?: string; model?: string; sign?: string }
      ) => {
         return ipcRenderer.invoke("listVehicles", page, quantity, filters)
      },
      getVehicleById: (id: number) => ipcRenderer.invoke("getVehicleById", id),
   })
}
