<template>
   <v-card :title="vehicleSelectedAction.toString() + ' veículo'">
      <template v-slot:text>
         <v-form ref="formVehicle" v-model="formVehicleValid" lazy-validation>
            <v-row>
               <v-col cols="12">
                  <v-text-field
                     v-model="vehicleSelected.model"
                     :rules="VehicleRules.model"
                     :disabled="isDeletingVehicle"
                     flat
                     label="Modelo"
                  ></v-text-field>
               </v-col>

               <v-col cols="12" md="6">
                  <v-autocomplete
                     v-model="vehicleSelected.brand"
                     :items="VehicleBrandSelectItems"
                     :disabled="isDeletingVehicle"
                     label="Marca"
                  ></v-autocomplete>
               </v-col>

               <v-col cols="12" md="6">
                  <v-autocomplete
                     v-model="vehicleSelected.fuel"
                     :items="FuelSelectItems"
                     :disabled="isDeletingVehicle"
                     label="Combustível"
                  ></v-autocomplete>
               </v-col>

               <v-col cols="12" md="6">
                  <v-text-field
                     v-model="vehicleSelected.year"
                     :disabled="isDeletingVehicle"
                     label="Ano"
                  ></v-text-field>
               </v-col>

               <v-col cols="12" md="6">
                  <v-text-field
                     v-model="vehicleSelected.color"
                     :disabled="isDeletingVehicle"
                     label="Cor"
                  ></v-text-field>
               </v-col>
            </v-row>
         </v-form>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
         <v-btn text="Cancelar" variant="plain" @click="cancel"></v-btn>

         <v-spacer></v-spacer>

         <v-btn text="Confirmar" @click="confirm"></v-btn>
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
import { computed, onMounted, ref } from "vue"
import { ActionForm } from "@src/data/enums/ActionForm"

const { fetchVehicles, fetchVehicleById, cancelOperation, confirmOperation } =
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

const isDeletingVehicle = computed(() => {
   return vehicleSelectedAction.value === ActionForm.DELETE
})

const cancel = () => {
   cancelOperation(
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const confirm = async () => {
   if (formVehicle.value === null) return

   if (!formVehicleValid.value) {
      return
   }

   console.log("Submitting form:", vehicleSelected.value)

   const key = await confirmOperation(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )

   await fetchVehicleById(key!, vehicleSelected, vehicleSelectedLoading)

   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
   )
}

onMounted(() => {
   console.log(VehicleBrandSelectItems)
})
</script>
