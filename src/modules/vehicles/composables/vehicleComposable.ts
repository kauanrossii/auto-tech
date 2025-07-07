import { Ref } from "vue"
import { Vehicle } from "../../../../electron/main/entities/vehicle"
import { ActionForm } from "../../../data/enums/ActionForm"

export function useVehicleComposable() {
   const editVehicle = async (
      id: number,
      item: Ref<Vehicle>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      await fetchVehicleById(id, item, loading)
      action.value = ActionForm.UPDATE
      manipulating.value = true
   }

   const createVehicle = (
      item: Ref<Vehicle>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      item.value = {
         id: 0,
         model: "",
         brand: "",
         plate: "",
         year: 0,
         fuel: null,
         lastMileage: 0,
         color: "",
         chassi: "",
      }
      action.value = ActionForm.CREATE
      manipulating.value = true
      loading.value = false
   }

   const deleteVehicle = async (
      id: number,
      item: Ref<Vehicle>,
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
      item: Ref<Vehicle>,
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
      item: Ref<Vehicle>,
      loading: Ref<boolean>,
      manipulating: Ref<boolean>,
      action: Ref<ActionForm>
   ) => {
      loading.value = true
      manipulating.value = true
      try {
         //  if (action.value === ActionForm.CREATE) {
         //     await window.management.createVehicle(item.value)
         //  } else if (action.value === ActionForm.UPDATE) {
         //     await window.management.updateVehicle(item.value)
         //  } else if (action.value === ActionForm.DELETE) {
         //     await window.management.deleteVehicle(item.value.id)
         //  }
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
      fetchVehicleById,
      confirmOperation,
      cancelOperation,
   }
}
