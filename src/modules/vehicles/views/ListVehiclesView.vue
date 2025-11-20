<template>
   <v-sheet class="w-100 h-75 d-flex justify-center">
      <v-data-table
         :items="vehicleList"
         :headers="headers"
         :items-per-page="vehicleListPagination.quantity"
         :items-per-page-options="[10, 25, 50]"
      >
         <template #top>
            <v-toolbar flat class="bg-white">
               <v-toolbar-title> Veículos cadastrados </v-toolbar-title>

               <v-btn
                  class="me-2"
                  variant="elevated"
                  prepend-icon="mdi-plus"
                  rounded="sm"
                  text="Cadastrar veículo"
                  border
                  @click="createVehicleHandler"
               ></v-btn>
            </v-toolbar>
         </template>

         <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2 justify-end">
               <v-icon
                  color="medium-emphasis"
                  icon="mdi-pencil"
                  size="small"
                  @click="editVehicleHandler(item.id)"
               ></v-icon>

               <v-icon
                  color="medium-emphasis"
                  icon="mdi-delete"
                  size="small"
                  @click="deleteVehicleHandler(item.id)"
               ></v-icon>
            </div>
         </template>
      </v-data-table>
   </v-sheet>

   <v-dialog
      v-model="vehicleSelectedManipulating"
      width="40vw"
      max-width="700px"
   >
      <VehicleForm />
   </v-dialog>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import VehicleForm from "../components/VehicleForm.vue"
import { useVehicle } from "../providers/vehicleProvider"
import { useVehicleComposable } from "../composables/vehicleComposable"

const {
   vehicleList,
   vehicleListFilters,
   vehicleListPagination,
   vehicleListLoading,
   vehicleSelected,
   vehicleSelectedAction,
   vehicleSelectedLoading,
   vehicleSelectedManipulating,
} = useVehicle()

const { editVehicle, deleteVehicle, createVehicle, fetchVehicles } =
   useVehicleComposable()

const headers = [
   { title: "Placa", key: "plate" },
   { title: "Modelo", key: "model" },
   { title: "Marca", key: "brand" },
   { title: "Ano", key: "year" },
   { title: "Cor", key: "color" },
   {
      title: "Actions",
      key: "actions",
      align: "center" as const,
      sortable: false,
   },
]

const createVehicleHandler = () => {
   createVehicle(
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const editVehicleHandler = async (id: number) => {
   await editVehicle(
      id,
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

const deleteVehicleHandler = async (id: number) => {
   await deleteVehicle(
      id,
      vehicleSelected,
      vehicleSelectedLoading,
      vehicleSelectedManipulating,
      vehicleSelectedAction
   )
}

onMounted(async () => {
   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
   )
})
</script>
