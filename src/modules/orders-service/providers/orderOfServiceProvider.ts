import { provide, ref } from "vue"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchOrdersOfServiceFilters } from "@shared/interfaces/orders-of-service/search-orders-of-service.dto"
import { OrderOfServiceListItemDto } from "@shared/interfaces/orders-of-service/order-of-service-list-item.dto"
import { OrderOfServiceKeys } from "./orderOfServiceKeys"

export function useOrderOfService() {
   const orderList = ref<OrderOfServiceListItemDto[]>([])
   const orderListLoading = ref<boolean>(false)
   const orderListPagination = ref<PaginationDto>({
      page: 1,
      quantity: 10,
      totalItems: 0,
   })
   const orderListFilters = ref<SearchOrdersOfServiceFilters>({
      customerName: null,
      vehicleName: null,
   })

   provide(OrderOfServiceKeys.orderList, orderList)
   provide(OrderOfServiceKeys.orderListLoading, orderListLoading)
   provide(OrderOfServiceKeys.orderListPagination, orderListPagination)
   provide(OrderOfServiceKeys.orderListFilters, orderListFilters)

   return {
      orderList,
      orderListLoading,
      orderListPagination,
      orderListFilters,
   }
}
