import { provide, ref } from "vue"
import { Customer } from "../../../../electron/main/entities/customer"
import { ActionForm } from "../../../data/enums/ActionForm"
import { CustomerKeys } from "./customerKeys"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchCustomersFilters } from "@shared/interfaces/search-customers.dto"

export function useCustomer() {
   const customerList = ref<Customer[]>([])
   const customerListLoading = ref<boolean>(false)
   const customerListPagination = ref<PaginationDto>({
      page: 1,
      quantity: 10,
      totalItems: 0,
   })
   const customerListFilters = ref<SearchCustomersFilters>({
      name: null,
      govIdentifier: null,
      cellphone: null,
   })

   provide(CustomerKeys.customerList, customerList)
   provide(CustomerKeys.customerListLoading, customerListLoading)
   provide(CustomerKeys.customerListPagination, customerListPagination)
   provide(CustomerKeys.customerListFilters, customerListFilters)

   const customerSelected = ref<Customer>({} as Customer)
   const customerSelectedAction = ref<ActionForm>(ActionForm.NONE)
   const customerSelectedLoading = ref<boolean>(false)
   const customerSelectedManipulating = ref<boolean>(false)

   provide(CustomerKeys.customerSelected, customerSelected)
   provide(CustomerKeys.customerSelectedAction, customerSelectedAction)
   provide(CustomerKeys.customerSelectedLoading, customerSelectedLoading)
   provide(
      CustomerKeys.customerSelectedManipulating,
      customerSelectedManipulating
   )

   return {
      customerList,
      customerListLoading,
      customerListPagination,
      customerListFilters,
      customerSelected,
      customerSelectedAction,
      customerSelectedLoading,
      customerSelectedManipulating,
   }
}
