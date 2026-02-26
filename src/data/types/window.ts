import { SearchVehiclesDto } from "@shared/interfaces/search-vehicles.dto"
import { SearchCustomersDto } from "@shared/interfaces/search-customers.dto"
import { Vehicle } from "../../../electron/main/entities/vehicle"
import { Customer } from "../../../electron/main/entities/customer"
import { CreateVehicleDto } from "@shared/interfaces/create-vehicle.dto"
import { PaginatedResultDto } from "@shared/interfaces/paginated-result.dto"

declare global {
   interface Window {
      management: {
         listVehicles: (
            searchVehiclesDto: SearchVehiclesDto
         ) => Promise<PaginatedResultDto<Vehicle>>
         getVehicleById: (id: number) => Promise<Vehicle>
         getVehicleByPlate: (plate: string) => Promise<Vehicle>
         createVehicle: (createVehicleDto: CreateVehicleDto) => Promise<Vehicle>
         updateVehicle: (vehicle: Vehicle) => Promise<Vehicle>
         deleteVehicle: (id: number) => Promise<void>
         listCustomers: (
            searchCustomersDto: SearchCustomersDto
         ) => Promise<PaginatedResultDto<Customer>>
         getCustomerById: (id: number) => Promise<Customer>
         createCustomer: (customer: Customer) => Promise<number>
         updateCustomer: (customer: Customer) => Promise<void>
         deleteCustomer: (id: number) => Promise<void>
         abc: () => Promise<string>
      }
   }
}
