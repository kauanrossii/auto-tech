import { InjectionKey, Ref } from "vue"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchOrdersOfServiceFilters } from "@shared/interfaces/orders-of-service/search-orders-of-service.dto"
import { OrderOfServiceListItemDto } from "@shared/interfaces/orders-of-service/order-of-service-list-item.dto"

export const OrderOfServiceKeys: {
   orderList: InjectionKey<Ref<OrderOfServiceListItemDto[]>>
   orderListLoading: InjectionKey<Ref<boolean>>
   orderListPagination: InjectionKey<Ref<PaginationDto>>
   orderListFilters: InjectionKey<Ref<SearchOrdersOfServiceFilters>>
} = {
   orderList: Symbol("orderList"),
   orderListLoading: Symbol("orderListLoading"),
   orderListPagination: Symbol("orderListPagination"),
   orderListFilters: Symbol("orderListFilters"),
}
