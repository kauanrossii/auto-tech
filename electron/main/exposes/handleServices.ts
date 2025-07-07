import { ipcMain } from "electron"
import vehiclesService from "../services/vehicles.service"
import { Fuel } from "../entities/fuel.enum"

const vehicles = [
   {
      id: 1,
      model: "Fusca",
      brand: "Volkswagen",
      sign: "ABC-1234",
      year: 1970,
      fuel: Fuel.GAS,
      lastMileage: 100000,
      color: "Azul",
      chassi: "123456789",
   },
   {
      id: 2,
      model: "Civic",
      brand: "Honda",
      sign: "XYZ-5678",
      year: 2015,
      fuel: Fuel.FLEX,
      lastMileage: 50000,
      color: "Preto",
      chassi: "987654321",
   },
]

async function getPaginatedVehicles(
   page: number,
   quantity: number,
   filters?: { name?: string; model?: string; sign?: string }
) {
   return vehicles
   return await vehiclesService.getPaginated(1, 20)
}

async function getVehicleById(id: number) {
   return vehicles.find((vehicle) => vehicle.id === id) || null
   return await vehiclesService.getById(id)
}

export function handleFeatures() {
   ipcMain.handle(
      "listVehicles",
      async (
         event,
         page: number,
         quantity: number,
         filters?: { name?: string; model?: string; sign?: string }
      ) => {
         console.log("(main) Fetching vehicles with filters:", filters)
         return getPaginatedVehicles(page, quantity, filters)
      }
   )
   ipcMain.handle("getVehicleById", async (event, id: number) => {
      return await getVehicleById(id)
   })
}
