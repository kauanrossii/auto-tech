import { Ref } from "vue"
import { Customer } from "../../../../electron/main/entities/customer"
import { ActionForm } from "../../../data/enums/ActionForm"
import { SearchCustomersFilters } from "@shared/interfaces/search-customers.dto"
import { PaginationDto } from "@shared/interfaces/pagination.dto"

export function useCustomerComposable() {
   const fetchCustomers = async (
      items: Ref<Customer[]>,
      filters: Ref<SearchCustomersFilters>,
      pagination: Ref<PaginationDto>,
      loading: Ref<boolean>
   ) => {
      loading.value = true
      try {
         const response = await window.management.listCustomers({
            filters: { ...filters.value },
            pagination: { ...pagination.value },
         })
         items.value = response.items
         pagination.value.totalItems = response.totalItems
      } catch (error) {
         console.error("Error fetching customers:", error)
      } finally {
         loading.value = false
      }
   }

   const editCustomer = async (
      id: number,
      item: Ref<Customer>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      await fetchCustomerById(id, item, loading)
      action.value = ActionForm.UPDATE
      manipulating.value = true
   }

   const createCustomer = (
      item: Ref<Customer>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      cleanFormCustomer(item, action, manipulating)
      action.value = ActionForm.CREATE
      manipulating.value = true
      loading.value = false
   }

   const cleanFormCustomer = (
      item: Ref<Customer>,
      action: Ref<ActionForm>,
      manipulating: Ref<boolean>
   ) => {
      item.value = {
         id: 0,
         name: "",
         type: 1,
         addressId: 0,
      } as Customer
      action.value = ActionForm.NONE
      manipulating.value = false
   }

   const deleteCustomer = async (
      id: number,
      item: Ref<Customer>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      await fetchCustomerById(id, item, loading)
      action.value = ActionForm.DELETE
      manipulating.value = true
   }

   const fetchCustomerById = async (
      id: number,
      item: Ref<Customer>,
      loading: Ref<boolean>
   ) => {
      loading.value = true
      try {
         const response = await window.management.getCustomerById(id)
         if (response) {
            item.value = response
         }
      } catch (error) {
         console.error("Error fetching customer by ID:", error)
      } finally {
         loading.value = false
      }
   }

   const confirmOperation = async (
      item: Ref<Customer>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ): Promise<number | void> => {
      loading.value = true
      manipulating.value = true
      try {
         if (action.value === ActionForm.CREATE) {
            const response = await window.management.createCustomer(item.value)
            if (response && typeof response === "number") {
               item.value.id = response
            }
         } else if (action.value === ActionForm.UPDATE) {
            await window.management.updateCustomer(item.value)
         } else if (action.value === ActionForm.DELETE) {
            await window.management.deleteCustomer(item.value.id!)
         }
         return item.value.id ?? undefined
      } catch (error) {
         console.error("Error during operation:", error)
         cleanFormCustomer(item, action, manipulating)
         return undefined
      } finally {
         loading.value = false
      }
   }

   const cancelOperation = (
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      loading.value = false
      manipulating.value = false
      action.value = ActionForm.NONE
   }

   return {
      editCustomer,
      createCustomer,
      deleteCustomer,
      fetchCustomers,
      fetchCustomerById,
      confirmOperation,
      cancelOperation,
   }
}
