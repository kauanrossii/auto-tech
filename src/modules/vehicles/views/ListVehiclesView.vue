<template>
   <v-sheet class="w-100 h-100 d-flex justify-center">
      <v-data-table-server
         hover
         loading-text="Carregando dados de veículos"
         :headers="headers"
         :items="vehicleList"
         :items-length="vehicleListPagination.totalItems"
         :page="vehicleListPagination.page"
         :items-per-page="vehicleListPagination.quantity"
         :items-per-page-options="[10, 25, 50]"
         :loading="vehicleListLoading"
         @update:options="
            ({ page, itemsPerPage }) => updateOptions(page, itemsPerPage)
         "
      >
         <template #top>
            <v-toolbar flat class="bg-white">
               <v-toolbar-title> Veículos cadastrados </v-toolbar-title>

               <v-btn
                  class="me-2"
                  variant="elevated"
                  rounded="sm"
                  color="primary"
                  text="Cadastrar veículo"
                  @click="createVehicleHandler"
               ></v-btn>
            </v-toolbar>
         </template>

         <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2 justify-center">
               <v-tooltip
                  text="Visualizar"
                  location="top"
                  location-strategy="connected"
               >
                  <template #activator="{ props }">
                     <v-btn
                        v-bind="props"
                        color="medium-emphasis"
                        icon="mdi-eye"
                        variant="text"
                        @click="editVehicleHandler(item.id)"
                     ></v-btn>
                  </template>
               </v-tooltip>

               <v-tooltip
                  text="Editar"
                  location="top"
                  location-strategy="connected"
               >
                  <template #activator="{ props }">
                     <v-btn
                        v-bind="props"
                        color="medium-emphasis"
                        icon="mdi-pencil"
                        variant="text"
                        @click="editVehicleHandler(item.id)"
                     ></v-btn>
                  </template>
               </v-tooltip>

               <v-tooltip
                  text="Deletar"
                  location="top"
                  location-strategy="connected"
               >
                  <template #activator="{ props }">
                     <v-btn
                        v-bind="props"
                        color="medium-emphasis"
                        icon="mdi-delete"
                        variant="text"
                        @click="deleteVehicleHandler(item.id)"
                     >
                     </v-btn>
                  </template>
               </v-tooltip>
            </div>
         </template>
      </v-data-table-server>
   </v-sheet>

   <v-dialog v-model="vehicleSelectedManipulating" max-width="700px">
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
      title: "Ações",
      key: "actions",
      align: "center" as const,
      sortable: false,
      width: "50px",
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

const updateOptions = async (page: number, itemsPerPage: number) => {
   vehicleListPagination.value.page = page
   vehicleListPagination.value.quantity = itemsPerPage
   await fetchVehicles(
      vehicleList,
      vehicleListFilters,
      vehicleListPagination,
      vehicleListLoading
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
