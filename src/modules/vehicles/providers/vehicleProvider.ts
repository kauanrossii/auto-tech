import { provide, ref } from "vue"
import { Vehicle } from "../../../../electron/main/entities/vehicle"
import { ActionForm } from "../../../data/enums/ActionForm"
import { VehicleKeys } from "./vehicleKeys"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchVehiclesFilters } from "@shared/interfaces/search-vehicles.dto"
import { VehicleForm } from "../types/vehicle-form"

export function useVehicle() {
   const vehicleList = ref<Vehicle[]>([])
   const vehicleListLoading = ref<boolean>(false)
   const vehicleListPagination = ref<PaginationDto>({
      page: 1,
      quantity: 25,
      totalItems: 0,
   })
   const vehicleListFilters = ref<SearchVehiclesFilters>({
      name: null,
      model: null,
      sign: null,
   })

   provide(VehicleKeys.vehicleList, vehicleList)
   provide(VehicleKeys.vehicleListLoading, vehicleListLoading)
   provide(VehicleKeys.vehicleListPagination, vehicleListPagination)
   provide(VehicleKeys.vehicleListFilters, vehicleListFilters)

   const vehicleSelected = ref<VehicleForm>({} as VehicleForm)
   const vehicleSelectedAction = ref<ActionForm>(ActionForm.NONE)
   const vehicleSelectedLoading = ref<boolean>(false)
   const vehicleSelectedManipulating = ref<boolean>(false)

   provide(VehicleKeys.vehicleSelected, vehicleSelected)
   provide(VehicleKeys.vehicleSelectedAction, vehicleSelectedAction)
   provide(VehicleKeys.vehicleSelectedLoading, vehicleSelectedLoading)
   provide(VehicleKeys.vehicleSelectedManipulating, vehicleSelectedManipulating)

   return {
      vehicleList,
      vehicleListLoading,
      vehicleListPagination,
      vehicleListFilters,
      vehicleSelected,
      vehicleSelectedAction,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
   }
}
