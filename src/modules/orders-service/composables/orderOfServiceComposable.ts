import { Ref } from "vue"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { SearchOrdersOfServiceFilters } from "@shared/interfaces/orders-of-service/search-orders-of-service.dto"
import { OrderOfServiceListItemDto } from "@shared/interfaces/orders-of-service/order-of-service-list-item.dto"

export function useOrderOfServiceComposable() {
   let fetchGeneration = 0

   const invalidatePendingOrderListFetch = (): void => {
      fetchGeneration++
   }

   const fetchOrdersOfService = async (
      items: Ref<OrderOfServiceListItemDto[]>,
      filters: Ref<SearchOrdersOfServiceFilters>,
      pagination: Ref<PaginationDto>,
      loading: Ref<boolean>
   ) => {
      const generation = ++fetchGeneration
      loading.value = true
      try {
         const response = await window.management.listOrdersOfService({
            filters: { ...filters.value },
            pagination: { ...pagination.value },
         })
         if (generation !== fetchGeneration) return
         items.value = response.items
         pagination.value.totalItems = response.totalItems
      } catch (error) {
         if (generation !== fetchGeneration) return
         console.error("Error fetching orders of service:", error)
      } finally {
         if (generation === fetchGeneration) {
            loading.value = false
         }
      }
   }

   const deleteOrderOfService = async (id: number): Promise<void> => {
      await window.management.deleteOrderOfService(id)
   }

   return {
      fetchOrdersOfService,
      deleteOrderOfService,
      invalidatePendingOrderListFetch,
   }
}
