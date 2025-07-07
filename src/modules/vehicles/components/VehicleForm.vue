<template>
   <v-card :title="vehicleSelectedAction.toString()">
      <template v-slot:text>
         <v-row>
            <v-col cols="12">
               <v-text-field
                  v-model="vehicleSelected.model"
                  label="Modelo"
               ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
               <v-text-field
                  v-model="vehicleSelected.brand"
                  label="Marca"
               ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
               <v-select
                  v-model="vehicleSelected.fuel"
                  :items="fuelItems"
                  label="Combustível"
               ></v-select>
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
import { Fuel } from "../../../../electron/main/entities/fuel.enum"

const fuelItems = Object.values(Fuel)

const { cancelOperation, confirmOperation } = useVehicleComposable()

const vehicleSelected = injectStrict(VehicleKeys.vehicleSelected)
const vehicleSelectedAction = injectStrict(VehicleKeys.vehicleSelectedAction)
const vehicleSelectedManipulating = injectStrict(
   VehicleKeys.vehicleSelectedManipulating
)
const vehicleSelectedLoading = injectStrict(VehicleKeys.vehicleSelectedLoading)

const cancel = () => {
   cancelOperation(
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const confirm = () => {
   confirmOperation(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}
</script>
