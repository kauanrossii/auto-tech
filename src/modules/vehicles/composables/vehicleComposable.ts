import { Ref } from "vue"
import { ActionForm } from "../../../data/enums/ActionForm"
import { SearchVehiclesFilters } from "@shared/interfaces/vehicles/search-vehicles.dto"
import { PaginationDto } from "@shared/interfaces/pagination.dto"
import { VehicleForm } from "../types/vehicle-form"
import { CreateVehicleDto } from "@shared/interfaces/vehicles/create-vehicle.dto"
import { VehicleListItemDto } from "@shared/interfaces/vehicles/vehicle.dto"
import {
   vehicleDtoToForm,
   vehicleFormToUpdateDto,
} from "../utils/vehicle-form-to-dto"

export function useVehicleComposable() {
   const fetchVehicles = async (
      items: Ref<VehicleListItemDto[]>,
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
         items.value = response.items
         pagination.value.totalItems = response.totalItems
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
      cleanFormVehicle(item, action, manipulating)
      action.value = ActionForm.CREATE
      manipulating.value = true
      loading.value = false
   }

   const cleanFormVehicle = (
      item: Ref<VehicleForm>,
      action: Ref<ActionForm>,
      manipulating: Ref<boolean>
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
      action.value = ActionForm.NONE
      manipulating.value = false
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
         if (response) item.value = vehicleDtoToForm(response)
      } catch (error) {
         console.error("Error fetching vehicle by ID:", error)
      } finally {
         loading.value = false
      }
   }

   const fetchVehicleByPlate = async (
      plate: string,
      item: Ref<VehicleForm>,
      loading: Ref<boolean>
   ) => {
      loading.value = true
      try {
         const response = await window.management.getVehicleByPlate(plate)
         if (response) item.value = vehicleDtoToForm(response)
      } catch (error) {
         console.error("Error fetching vehicle by plate:", error)
      } finally {
         loading.value = false
      }
   }

   const confirmOperation = async (
      item: Ref<VehicleForm>,
      loading: Ref<boolean>,
      action: Ref<ActionForm>
   ): Promise<number | void> => {
      loading.value = true
      try {
         if (action.value === ActionForm.CREATE) {
            await window.management.createVehicle({
               ...item.value,
            } as CreateVehicleDto)
         } else if (action.value === ActionForm.UPDATE) {
            const dto = vehicleFormToUpdateDto(item.value)
            if (dto) await window.management.updateVehicle(dto)
         } else if (action.value === ActionForm.DELETE) {
            await window.management.deleteVehicle(item.value.id!)
         }
         return item.value.id ?? undefined
      } catch (error) {
         console.error("Error during operation:", error)
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
      editVehicle,
      createVehicle,
      deleteVehicle,
      fetchVehicles,
      fetchVehicleById,
      fetchVehicleByPlate,
      confirmOperation,
      cancelOperation,
   }
}
