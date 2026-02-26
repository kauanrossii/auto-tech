<template>
   <v-card class="d-flex flex-column">
      <v-card-title :class="titleBackgroundClass" class="py-3">{{
         title
      }}</v-card-title>
      <v-card-text class="overflow-y-auto flex-grow-1 pa-6">
         <v-form ref="formVehicle" v-model="formVehicleValid" lazy-validation>
            <v-row>
               <v-col cols="4">
                  <div class="d-flex flex-column">
                     <v-label for="plate-input" class="mb-1">Placa *</v-label>
                     <v-text-field
                        id="plate-input"
                        v-model="vehicleSelected.plate"
                        :disabled="isDeletingVehicle"
                        :rules="VehicleRules.plate"
                        :error="plateError"
                        :error-messages="plateMessages"
                        @blur="handlePlateBlur"
                     >
                     </v-text-field>
                  </div>
               </v-col>
            </v-row>
            <v-row>
               <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                     <div class="d-flex ga-2">
                        <v-label for="model-input" class="mb-1"
                           >Modelo *</v-label
                        >
                        <v-tooltip
                           location="top"
                           max-width="250px"
                           text="Nome do modelo que identifica o carro. Por exemplo Gol, Cobalt ou Civic"
                        >
                           <template #activator="{ props }">
                              <v-icon color="grey" size="small" v-bind="props">
                                 mdi-information
                              </v-icon>
                           </template>
                        </v-tooltip>
                     </div>
                     <v-text-field
                        v-model="vehicleSelected.model"
                        :rules="VehicleRules.model"
                        :disabled="isDeletingVehicle"
                        id="model-input"
                     >
                     </v-text-field>
                  </div>
               </v-col>

               <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                     <v-label for="brand-input" class="mb-1"
                        >Montadora *</v-label
                     >
                     <v-autocomplete
                        id="brand-input"
                        v-model="vehicleSelected.brand"
                        :items="VehicleBrandSelectItems"
                        :disabled="isDeletingVehicle"
                        :rules="VehicleRules.brand"
                     ></v-autocomplete>
                  </div>
               </v-col>

               <v-col cols="12" md="6">
                  <v-label for="fuel-input" class="mb-1"
                     >Tipo de Combustível</v-label
                  >
                  <v-autocomplete
                     id="fuel-input"
                     v-model="vehicleSelected.fuel"
                     :items="FuelSelectItems"
                     :disabled="isDeletingVehicle"
                  ></v-autocomplete>
               </v-col>

               <v-col cols="12" md="6">
                  <v-label for="year-input" class="mb-1"
                     >Ano de Fabricação</v-label
                  >
                  <v-text-field
                     id="year-input"
                     v-model="vehicleSelected.year"
                     :disabled="isDeletingVehicle"
                  ></v-text-field>
               </v-col>

               <v-col cols="12" md="6">
                  <v-label for="color-input" class="mb-1">Cor</v-label>
                  <v-text-field
                     id="color-input"
                     v-model="vehicleSelected.color"
                     :disabled="isDeletingVehicle"
                  ></v-text-field>
               </v-col>

               <v-col cols="12" md="6">
                  <v-label for="mileage-input" class="mb-1"
                     >Última quilometragem</v-label
                  >
                  <v-text-field
                     id="mileage-input"
                     v-model="vehicleSelected.lastMileage"
                     :disabled="isDeletingVehicle"
                  ></v-text-field>
               </v-col>
            </v-row>
         </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="ga-4 bg-surface-light">
         <v-btn
            text="Cancelar"
            color="primary"
            variant="tonal"
            rounded="sm"
            class="px-7"
            @click="cancel"
         ></v-btn>

         <v-btn
            variant="elevated"
            color="primary"
            text="Confirmar"
            rounded="sm"
            class="px-7"
            @click="confirm"
            :disabled="
               vehicleSelectedLoading ||
               (vehicleSelectedAction !== ActionForm.DELETE &&
                  !formVehicleValid)
            "
         ></v-btn>
      </v-card-actions>
   </v-card>
</template>

<script setup lang="ts">
import { injectStrict } from "../../../utils/injectionUtils"
import { VehicleKeys } from "../providers/vehicleKeys"
import { useVehicleComposable } from "../composables/vehicleComposable"
import { FuelSelectItems } from "../../../data/constants/fuel-items"
import { VehicleBrandSelectItems } from "@src/data/constants/vehicle-brands-items"
import { VehicleRules } from "../rules/vehicle-rules"
import { computed, ref } from "vue"
import { ActionForm } from "@src/data/enums/ActionForm"

const { fetchVehicles, cancelOperation, confirmOperation } =
   useVehicleComposable()

const vehicleList = injectStrict(VehicleKeys.vehicleList)
const vehicleListFilters = injectStrict(VehicleKeys.vehicleListFilters)
const vehicleListPagination = injectStrict(VehicleKeys.vehicleListPagination)
const vehicleListLoading = injectStrict(VehicleKeys.vehicleListLoading)
const vehicleSelected = injectStrict(VehicleKeys.vehicleSelected)
const vehicleSelectedAction = injectStrict(VehicleKeys.vehicleSelectedAction)
const vehicleSelectedManipulating = injectStrict(
   VehicleKeys.vehicleSelectedManipulating
)
const vehicleSelectedLoading = injectStrict(VehicleKeys.vehicleSelectedLoading)
const formVehicleValid = ref(false)
const formVehicle = ref(Object.assign({}, vehicleSelected.value))
const plateMessages = ref<string[]>([])
const plateError = ref(false)

const isDeletingVehicle = computed(() => {
   return vehicleSelectedAction.value === ActionForm.DELETE
})

const title = computed(() => {
   switch (vehicleSelectedAction.value) {
      case ActionForm.CREATE:
         return "Cadastrar veículo"
      case ActionForm.UPDATE:
         return "Editar veículo"
      case ActionForm.DELETE:
         return "Deseja mesmo deletar o veículo?"
      default:
         return ""
   }
})

const titleBackgroundClass = computed(() => {
   switch (vehicleSelectedAction.value) {
      case ActionForm.CREATE:
         return "bg-blue-darken-3"
      case ActionForm.UPDATE:
         return "bg-blue-grey"
      case ActionForm.DELETE:
         return "bg-red-darken-3"
      default:
         return "bg-surface-light"
   }
})

const cancel = () => {
   cancelOperation(
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const handlePlateBlur = async () => {
   plateMessages.value = []
   plateError.value = false
   if (!vehicleSelected.value.plate) return

   try {
      vehicleSelectedLoading.value = true
      const vehicle = await window.management.getVehicleByPlate(
         vehicleSelected.value.plate
      )

      if (vehicle) {
         plateMessages.value = [
            `Já existe outro veículo cadastrado com esta placa`,
         ]
         plateError.value = true
      }
   } catch (error) {
      console.error("Error fetching vehicle by plate:", error)
      plateMessages.value = []
      plateError.value = false
   } finally {
      vehicleSelectedLoading.value = false
   }
}

const confirm = async () => {
   if (formVehicle.value === null) return

   if (!formVehicleValid.value) {
      return
   }

   await confirmOperation(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedAction
   )

   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
   )

   vehicleSelectedAction.value = ActionForm.NONE
   vehicleSelectedManipulating.value = false
}
</script>
