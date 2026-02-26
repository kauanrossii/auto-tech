import { Ref } from "vue"
import { Customer } from "../../../../electron/main/entities/customer"
import { ActionForm } from "../../../data/enums/ActionForm"
import { SearchCustomersFilters } from "@shared/interfaces/customers/search-customers.dto"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { CustomerForm } from "../types/customer-form"
import { CreateCustomerDto } from "@shared/interfaces/customers/create-customer.dto"

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
      item: Ref<CustomerForm>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      await fetchCustomerById(id, item, loading)
      action.value = ActionForm.UPDATE
      manipulating.value = true
   }

   const createCustomer = (
      item: Ref<CustomerForm>,
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
      item: Ref<CustomerForm>,
      action: Ref<ActionForm>,
      manipulating: Ref<boolean>
   ) => {
      item.value = {
         id: null,
         name: "",
         type: null,
         govDocument: null,
         govIdentifier: null,
         cellphone: null,
         phone: null,
         email: null,
         address: {
            id: null,
            cep: "",
            uf: null,
            city: null,
            district: null,
            street: null,
            unit: null,
         },
      } as CustomerForm
      action.value = ActionForm.NONE
      manipulating.value = false
   }

   const deleteCustomer = async (
      id: number,
      item: Ref<CustomerForm>,
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
      item: Ref<CustomerForm>,
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
      item: Ref<CustomerForm>,
      loading: Ref<boolean>,
      action: Ref<ActionForm>
   ): Promise<number | void> => {
      loading.value = true
      try {
         if (action.value === ActionForm.CREATE) {
            const customerDto: CreateCustomerDto = {
               name: item.value.name,
               type: item.value.type!,
               email: item.value.email,
               govDocument: item.value.govDocument,
               govIdentifier: item.value.govIdentifier,
               cellphone: item.value.cellphone,
               phone: item.value.phone,
               address: {
                  cep: item.value.address?.cep ?? null,
                  uf: item.value.address?.uf ?? null,
                  city: item.value.address?.city ?? null,
                  district: item.value.address?.district ?? null,
                  street: item.value.address?.street ?? null,
                  unit: item.value.address?.unit ?? null,
               },
            }
            await window.management.createCustomer(customerDto)
         } else if (action.value === ActionForm.UPDATE) {
            await window.management.updateCustomer(item.value.id!, {
               id: item.value.id!,
               name: item.value.name,
               type: item.value.type!,
               email: item.value.email,
               govDocument: item.value.govDocument,
               govIdentifier: item.value.govIdentifier,
               cellphone: item.value.cellphone,
               phone: item.value.phone,
               address: {
                  id: item.value.address!.id ?? null,
                  cep: item.value.address?.cep ?? null,
                  uf: item.value.address?.uf ?? null,
                  city: item.value.address?.city ?? null,
                  district: item.value.address?.district ?? null,
                  street: item.value.address?.street ?? null,
                  unit: item.value.address?.unit ?? null,
               },
            })
         } else if (action.value === ActionForm.DELETE) {
            await window.management.deleteCustomer(item.value.id!)
         }
         return item.value.id ?? undefined
      } catch (error) {
         console.error("Error during operation:", error)
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
