import { InjectionKey, Ref } from "vue"
import { Vehicle } from "../../../../electron/main/entities/vehicle"
import { ActionForm } from "../../../data/enums/ActionForm"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchVehiclesFilters } from "@shared/interfaces/search-vehicles.dto"
import { VehicleForm } from "../types/vehicle-form"

export const VehicleKeys: {
   vehicleList: InjectionKey<Ref<Vehicle[]>>
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
