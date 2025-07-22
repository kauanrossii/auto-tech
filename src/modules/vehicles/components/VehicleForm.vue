<template>
   <v-card :title="vehicleSelectedAction.toString() + ' veículo'">
      <template v-slot:text>
         <v-row>
            <v-col cols="12">
               <v-text-field
                  v-model="vehicleSelected.model"
                  :rules="VehicleRules.model"
                  label="Modelo"
               ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
               <v-autocomplete
                  v-model="vehicleSelected.brand"
                  :items="VehicleBrandSelectItems"
                  label="Marca"
               ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
               <v-autocomplete
                  v-model="vehicleSelected.fuel"
                  :items="FuelSelectItems"
                  label="Combustível"
               ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
               <v-text-field
                  v-model="vehicleSelected.year"
                  label="Ano"
               ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
               <v-text-field
                  v-model="vehicleSelected.color"
                  label="Cor"
               ></v-text-field>
            </v-col>
         </v-row>
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
import { ref } from "vue"

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

const cancel = () => {
   cancelOperation(
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const confirm = async () => {
   if (formVehicle.value === null) return

   if (!formVehicleValid.value) return

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
</script>
