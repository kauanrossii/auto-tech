import { provide, ref } from "vue";
import { Vehicle } from "../../../../electron/main/entities/vehicle";
import { ActionForm } from "../../../data/enums/ActionForm";
import { VehicleKeys } from "./vehicleKeys";
import { PaginationDto } from "../../../data/types/pagination.dto";
import { SearchVehiclesFilters } from "../types/search-vehicles-filters";

export function useVehicle() {
    const vehicleList = ref<Vehicle[]>([]);
    const vehicleListLoading = ref<boolean>(false);
    const vehicleListPagination = ref<PaginationDto>({ pageNumber: 1, totalItems: 0, pageSize: 25 });
    const vehicleListFilters = ref<SearchVehiclesFilters>({ name: '', model: '', sign: '' });

    provide(VehicleKeys.vehicleList, vehicleList);
    provide(VehicleKeys.vehicleListLoading, vehicleListLoading);
    provide(VehicleKeys.vehicleListPagination, vehicleListPagination);
    provide(VehicleKeys.vehicleListFilters, vehicleListFilters);

    const vehicleSelected = ref<Vehicle>({} as Vehicle);
    const vehicleSelectedAction = ref<ActionForm>(ActionForm.NONE);
    const vehicleSelectedLoading = ref<boolean>(false);
    const vehicleSelectedManipulating = ref<boolean>(false);

    provide(VehicleKeys.vehicleSelected, vehicleSelected);
    provide(VehicleKeys.vehicleSelectedAction, vehicleSelectedAction);
    provide(VehicleKeys.vehicleSelectedLoading, vehicleSelectedLoading);
    provide(VehicleKeys.vehicleSelectedManipulating, vehicleSelectedManipulating);

    return {
        vehicleList,
        vehicleListLoading,
        vehicleListPagination,
        vehicleListFilters,
        vehicleSelected,
        vehicleSelectedAction,
        vehicleSelectedLoading,
        vehicleSelectedManipulating
    };
}