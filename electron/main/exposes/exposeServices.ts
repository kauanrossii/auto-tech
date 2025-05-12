import { ipcMain } from "electron";
import vehiclesService from "../services/vehicles.service";

async function getPaginatedVehicles() {
    return await vehiclesService.getPaginated(1, 20);
}

export function exposeFeatures() {
    ipcMain.handle('listVehicles', getPaginatedVehicles);
}