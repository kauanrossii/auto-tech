import { InjectionKey, Ref } from "vue";
import { PaginationDto } from "../../../data/types/pagination.dto";
import { SearchVehiclesFilters } from "../types/search-vehicles-filters";
import { Vehicle } from "../../../../electron/main/entities/vehicle";
import { ActionForm } from "../../../data/enums/ActionForm";

export const VehicleKeys: {
    vehicleList: InjectionKey<Ref<Vehicle[]>>;
    vehicleListLoading: InjectionKey<Ref<boolean>>;
    vehicleListPagination: InjectionKey<Ref<PaginationDto>>;
    vehicleListFilters: InjectionKey<Ref<SearchVehiclesFilters>>;

    vehicleSelected: InjectionKey<Ref<Vehicle>>;
    vehicleSelectedLoading: InjectionKey<Ref<boolean>>;
    vehicleSelectedManipulating: InjectionKey<Ref<boolean>>;
    vehicleSelectedAction: InjectionKey<Ref<ActionForm>>;
} = {
    vehicleList: Symbol("vehicleList"),
    vehicleListLoading: Symbol("vehicleListLoading"),
    vehicleListPagination: Symbol("vehicleListPagination"),
    vehicleListFilters: Symbol("vehicleListFilters"),

    vehicleSelected: Symbol("vehicleSelected"),
    vehicleSelectedLoading: Symbol("vehicleSelectedLoading"),
    vehicleSelectedManipulating: Symbol("vehicleSelectedManipulating"),
    vehicleSelectedAction: Symbol("vehicleSelectedAction")
};
