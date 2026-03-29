import { SearchVehiclesDto } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { SearchCustomersDto } from "@shared/interfaces/customers/search-customers.dto"
import {
   CreateVehicleDto,
   CreateVehicleResultDto,
} from "@shared/interfaces/vehicles/create-vehicle.dto"
import { UpdateVehicleDto } from "@shared/interfaces/vehicles/update-vehicle.dto"
import {
   VehicleDto,
   VehicleListItemDto,
} from "@shared/interfaces/vehicles/vehicle.dto"
import { Customer } from "../../../electron/main/entities/customer"
import { PaginatedResultDto } from "@shared/interfaces/paginated-result.dto"
import { CreateCustomerDto } from "@shared/interfaces/customers/create-customer.dto"
import { UpdateCustomerDto } from "@shared/interfaces/customers/update-customer.dto"
import { SearchOrdersOfServiceDto } from "@shared/interfaces/orders-of-service/search-orders-of-service.dto"
import { OrderOfServiceListItemDto } from "@shared/interfaces/orders-of-service/order-of-service-list-item.dto"
import { SystemConfigurationDto } from "@shared/interfaces/system-configurations/system-configuration.dto"
import { UpdateSystemConfigurationDto } from "@shared/interfaces/system-configurations/update-system-configuration.dto"

declare global {
   interface Window {
      management: {
         listVehicles: (
            searchVehiclesDto: SearchVehiclesDto
         ) => Promise<PaginatedResultDto<VehicleListItemDto>>
         getVehicleById: (id: number) => Promise<VehicleDto | undefined>
         getVehicleByPlate: (plate: string) => Promise<VehicleDto | undefined>
         createVehicle: (
            createVehicleDto: CreateVehicleDto
         ) => Promise<CreateVehicleResultDto>
         updateVehicle: (dto: UpdateVehicleDto) => Promise<void>
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
         listOrdersOfService: (
            dto: SearchOrdersOfServiceDto
         ) => Promise<PaginatedResultDto<OrderOfServiceListItemDto>>
         deleteOrderOfService: (id: number) => Promise<void>
         getNextOrderOfServiceId: () => Promise<number>

         getSystemConfiguration: () => Promise<SystemConfigurationDto | null>
         upsertSystemConfiguration: (
            dto: UpdateSystemConfigurationDto
         ) => Promise<SystemConfigurationDto>
      }
   }
}
