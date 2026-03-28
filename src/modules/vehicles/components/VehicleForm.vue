<template>
   <v-form v-model="formVehicleValid" lazy-validation>
      <v-row>
         <v-col cols="2" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="plate-input" class="mb-1">Placa *</v-label>
               <v-mask-input
                  id="plate-input"
                  density="compact"
                  hide-details
                  v-model="vehicleSelected.plate"
                  mask="AAA#A##"
                  placeholder="ABC1D23"
                  :disabled="isFieldsDisabled"
                  :rules="readonly ? [] : VehicleRules.plate"
                  :error="plateError"
                  :error-messages="plateMessages"
                  @blur="handlePlateBlur"
               >
               </v-mask-input>
            </div>
         </v-col>

         <v-col cols="12" md="5" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <div class="d-flex ga-2">
                  <v-label for="model-input" class="mb-1">Modelo *</v-label>
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
                  hide-details
                  v-model="vehicleSelected.model"
                  :rules="readonly ? [] : VehicleRules.model"
                  :disabled="isFieldsDisabled"
                  id="model-input"
                  density="compact"
               >
               </v-text-field>
            </div>
         </v-col>

         <v-col cols="12" md="5" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="brand-input" class="mb-1">Montadora *</v-label>
               <v-autocomplete
                  hide-details
                  id="brand-input"
                  density="compact"
                  v-model="vehicleSelected.brand"
                  :items="VehicleBrandSelectItems"
                  :disabled="isFieldsDisabled"
                  :rules="readonly ? [] : VehicleRules.brand"
               ></v-autocomplete>
            </div>
         </v-col>

         <v-col cols="12" md="3" class="pt-0 pb-2">
            <v-label for="fuel-input" class="mb-1">Tipo de Combustível</v-label>
            <v-autocomplete
               hide-details
               id="fuel-input"
               density="compact"
               v-model="vehicleSelected.fuel"
               :items="FuelSelectItems"
               :disabled="isFieldsDisabled"
            ></v-autocomplete>
         </v-col>

         <v-col cols="12" md="3" class="pt-0 pb-2">
            <v-label for="year-input" class="mb-1">Ano de Fabricação</v-label>
            <v-text-field
               hide-details
               id="year-input"
               density="compact"
               v-model="vehicleSelected.year"
               :disabled="isFieldsDisabled"
            ></v-text-field>
         </v-col>

         <v-col cols="12" md="3" class="pt-0 pb-2">
            <v-label for="color-input" class="mb-1">Cor</v-label>
            <v-text-field
               hide-details
               id="color-input"
               density="compact"
               v-model="vehicleSelected.color"
               :disabled="isFieldsDisabled"
            ></v-text-field>
         </v-col>

         <v-col cols="12" md="3" class="pt-0 pb-2">
            <v-label for="mileage-input" class="mb-1"
               >Última quilometragem</v-label
            >
            <v-text-field
               hide-details
               id="mileage-input"
               density="compact"
               v-model="vehicleSelected.lastMileage"
               :disabled="isFieldsDisabled"
            ></v-text-field>
         </v-col>

         <v-col cols="12" md="6" class="pt-0 pb-2">
            <div class="d-flex flex-column">
               <v-label for="chassi-input" class="mb-1">Chassi</v-label>
               <v-text-field
                  id="chassi-input"
                  hide-details
                  density="compact"
                  v-model="vehicleSelected.chassi"
                  :disabled="isFieldsDisabled"
               ></v-text-field>
            </div>
         </v-col>
      </v-row>
   </v-form>
</template>

<script setup lang="ts">
import { injectStrict } from "../../../utils/injectionUtils"
import { VehicleKeys } from "../providers/vehicleKeys"
import { FuelSelectItems } from "../../../data/constants/fuel-items"
import { VehicleBrandSelectItems } from "@src/data/constants/vehicle-brands-items"
import { VehicleRules } from "../rules/vehicle-rules"
import { computed, ref } from "vue"
import { ActionForm } from "@src/data/enums/ActionForm"

const props = withDefaults(
   defineProps<{
      readonly?: boolean
   }>(),
   { readonly: false }
)

const formVehicleValid = defineModel<boolean>("valid", { default: false })

const vehicleSelected = injectStrict(VehicleKeys.vehicleSelected)
const vehicleSelectedAction = injectStrict(VehicleKeys.vehicleSelectedAction)
const vehicleSelectedLoading = injectStrict(VehicleKeys.vehicleSelectedLoading)

const plateMessages = ref<string[]>([])
const plateError = ref(false)

const isDeletingVehicle = computed(() => {
   return vehicleSelectedAction.value === ActionForm.DELETE
})

const isFieldsDisabled = computed(
   () => isDeletingVehicle.value || props.readonly
)

const handlePlateBlur = async () => {
   if (props.readonly) return
   plateMessages.value = []
   plateError.value = false
   if (!vehicleSelected.value.plate) return

   try {
      vehicleSelectedLoading.value = true
      const vehicle = await window.management.getVehicleByPlate(
         vehicleSelected.value.plate
      )

      if (vehicle && vehicle.id !== vehicleSelected.value.id) {
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

</script>
