import { Ref } from "vue"
import { Vehicle } from "../../../../electron/main/entities/vehicle"
import { ActionForm } from "../../../data/enums/ActionForm"
import { SearchVehiclesFilters } from "@shared/interfaces/search-vehicles.dto"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { VehicleForm } from "../types/vehicle-form"

export function useVehicleComposable() {
   const fetchVehicles = async (
      items: Ref<Vehicle[]>,
      filters: Ref<SearchVehiclesFilters>,
      pagination: Ref<PaginationDto>,
      loading: Ref<boolean>
   ) => {
      loading.value = true
      try {
         const response = await window.management.listVehicles({
            filters: { ...filters.value },
            pagination: { ...pagination.value },
         })
         items.value = response
      } catch (error) {
         console.error("Error fetching vehicles:", error)
      } finally {
         loading.value = false
      }
   }

   const editVehicle = async (
      id: number,
      item: Ref<VehicleForm>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      await fetchVehicleById(id, item, loading)
      action.value = ActionForm.UPDATE
      manipulating.value = true
   }

   const createVehicle = (
      item: Ref<VehicleForm>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      item.value = {
         id: null,
         model: null,
         brand: null,
         plate: null,
         year: null,
         fuel: null,
         lastMileage: null,
         color: null,
         chassi: null,
      }
      action.value = ActionForm.CREATE
      manipulating.value = true
      loading.value = false
   }

   const deleteVehicle = async (
      id: number,
      item: Ref<VehicleForm>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      await fetchVehicleById(id, item, loading)
      action.value = ActionForm.DELETE
      manipulating.value = true
   }

   const fetchVehicleById = async (
      id: number,
      item: Ref<VehicleForm>,
      loading: Ref<boolean>
   ) => {
      loading.value = true
      try {
         const response = await window.management.getVehicleById(id)
         item.value = response
      } catch (error) {
         console.error("Error fetching vehicle by ID:", error)
      } finally {
         loading.value = false
      }
   }

   const confirmOperation = async (
      item: Ref<VehicleForm>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ): Promise<number | void> => {
      loading.value = true
      manipulating.value = true
      try {
          if (action.value === ActionForm.CREATE) {
             await window.management.createVehicle(item.value)
         //  } else if (action.value === ActionForm.UPDATE) {
         //     await window.management.updateVehicle(item.value)
         //  } else if (action.value === ActionForm.DELETE) {
         //     await window.management.deleteVehicle(item.value.id)
         //  }
         return item.value.id ?? undefined
      } catch (error) {
         console.error("Error during operation:", error)
      } finally {
         loading.value = false
         manipulating.value = false
         action.value = ActionForm.NONE
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
      editVehicle,
      createVehicle,
      deleteVehicle,
      fetchVehicles,
      fetchVehicleById,
      confirmOperation,
      cancelOperation,
   }
}
