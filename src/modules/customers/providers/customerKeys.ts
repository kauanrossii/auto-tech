import { SearchCustomersFilters } from "@shared/interfaces/customers/search-customers.dto"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { ActionForm } from "@src/data/enums/ActionForm"
import { Customer } from "electron/main/entities/customer"
import { InjectionKey, Ref } from "vue"
import { CustomerForm } from "../types/customer-form"

export const CustomerKeys: {
   customerList: InjectionKey<Ref<Customer[]>>
   customerListLoading: InjectionKey<Ref<boolean>>
   customerListPagination: InjectionKey<Ref<PaginationDto>>
   customerListFilters: InjectionKey<Ref<SearchCustomersFilters>>

   customerSelected: InjectionKey<Ref<CustomerForm>>
   customerSelectedLoading: InjectionKey<Ref<boolean>>
   customerSelectedManipulating: InjectionKey<Ref<boolean>>
   customerSelectedAction: InjectionKey<Ref<ActionForm>>
} = {
   customerList: Symbol("customerList"),
   customerListLoading: Symbol("customerListLoading"),
   customerListPagination: Symbol("customerListPagination"),
   customerListFilters: Symbol("customerListFilters"),
   customerSelected: Symbol("customerSelected"),
   customerSelectedAction: Symbol("customerSelectedAction"),
   customerSelectedLoading: Symbol("customerSelectedLoading"),
   customerSelectedManipulating: Symbol("customerSelectedManipulating"),
}
