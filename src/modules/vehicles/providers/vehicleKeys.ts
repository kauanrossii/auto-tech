import { InjectionKey, Ref } from "vue"
import { ActionForm } from "../../../data/enums/ActionForm"
import { VehicleListItemDto } from "@shared/interfaces/vehicles/vehicle.dto"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchVehiclesFilters } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { VehicleForm } from "../types/vehicle-form"

export const VehicleKeys: {
   vehicleList: InjectionKey<Ref<VehicleListItemDto[]>>
   vehicleListLoading: InjectionKey<Ref<boolean>>
   vehicleListPagination: InjectionKey<Ref<PaginationDto>>
   vehicleListFilters: InjectionKey<Ref<SearchVehiclesFilters>>

   vehicleSelected: InjectionKey<Ref<VehicleForm>>
   vehicleSelectedLoading: InjectionKey<Ref<boolean>>
   vehicleSelectedManipulating: InjectionKey<Ref<boolean>>
   vehicleSelectedAction: InjectionKey<Ref<ActionForm>>
} = {
   vehicleList: Symbol("vehicleList"),
   vehicleListLoading: Symbol("vehicleListLoading"),
   vehicleListPagination: Symbol("vehicleListPagination"),
   vehicleListFilters: Symbol("vehicleListFilters"),

   vehicleSelected: Symbol("vehicleSelected"),
   vehicleSelectedLoading: Symbol("vehicleSelectedLoading"),
   vehicleSelectedManipulating: Symbol("vehicleSelectedManipulating"),
   vehicleSelectedAction: Symbol("vehicleSelectedAction"),
}
