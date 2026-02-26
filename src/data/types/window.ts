import { SearchVehiclesDto } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { SearchCustomersDto } from "@shared/interfaces/customers/search-customers.dto"
import { Vehicle } from "../../../electron/main/entities/vehicle"
import { Customer } from "../../../electron/main/entities/customer"
import { CreateVehicleDto } from "@shared/interfaces/vehicles/create-vehicle.dto"
import { PaginatedResultDto } from "@shared/interfaces/paginated-result.dto"
import { CreateCustomerDto } from "@shared/interfaces/customers/create-customer.dto"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"

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
         getCustomerByName: (name: string) => Promise<Customer>
         getCustomerByGovIdentifier: (
            govIdentifier: string
         ) => Promise<Customer>
         getCustomerByGovDocument: (govDocument: string) => Promise<Customer>
         createCustomer: (customer: CreateCustomerDto) => Promise<number>
         updateCustomer: (
            id: number,
            customer: UpdateCustomerDto
         ) => Promise<void>
         deleteCustomer: (id: number) => Promise<void>
         abc: () => Promise<string>
      }
   }
}
