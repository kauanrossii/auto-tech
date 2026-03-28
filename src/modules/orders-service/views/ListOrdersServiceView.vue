<template>
   <v-sheet class="w-100 h-100 d-flex justify-center">
      <BaseTable
         :headers="headers"
         :items="orderList"
         :items-length="orderListPagination.totalItems"
         :page="orderListPagination.page"
         :items-per-page="orderListPagination.quantity"
         :loading="orderListLoading"
         loading-text="Carregando ordens de serviço"
         @update:options="
            ({ page, itemsPerPage }) => updateOptions(page, itemsPerPage)
         "
         @action:view="openOrderDetails"
         @action:edit="openOrderDetails"
         @action:delete="deleteOrderHandler"
      >
         <template #top>
            <v-toolbar flat class="bg-white">
               <v-toolbar-title>Ordens de Serviço</v-toolbar-title>

               <v-btn
                  class="me-2"
                  variant="elevated"
                  rounded="sm"
                  color="primary"
                  text="Cadastrar ordem de serviço"
                  @click="handleCreateOrderOfService"
               ></v-btn>
            </v-toolbar>
         </template>
      </BaseTable>
   </v-sheet>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import BaseTable from "../../../components/BaseTable.vue"
import { RoutesNames } from "@src/router/routes-names"
import { useOrderOfService } from "../providers/orderOfServiceProvider"
import { useOrderOfServiceComposable } from "../composables/orderOfServiceComposable"

const router = useRouter()

const {
   orderList,
   orderListFilters,
   orderListPagination,
   orderListLoading,
} = useOrderOfService()

const { fetchOrdersOfService, deleteOrderOfService } =
   useOrderOfServiceComposable()

const headers = [
   { title: "Número", key: "id", width: "90px" },
   { title: "Data", key: "dateDisplay" },
   { title: "Cliente", key: "customerName" },
   { title: "Veículo", key: "vehicleModel" },
   { title: "Valor total", key: "totalValueDisplay", align: "end" as const },
   {
      title: "Ações",
      key: "actions",
      align: "center" as const,
      sortable: false,
      width: "50px",
   },
]

function handleCreateOrderOfService() {
   router.push({ name: RoutesNames.ordersOfServiceCreate })
}

function openOrderDetails(id: number) {
   router.push({
      name: RoutesNames.ordersOfServiceDetails,
      params: { id: String(id) },
   })
}

async function deleteOrderHandler(id: number) {
   const ok = window.confirm(
      "Deseja realmente excluir esta ordem de serviço?"
   )
   if (!ok) return
   try {
      await deleteOrderOfService(id)
      await fetchOrdersOfService(
         orderList,
         orderListFilters,
         orderListPagination,
         orderListLoading
      )
   } catch (error) {
      console.error("Error deleting order of service:", error)
   }
}

const updateOptions = async (page: number, itemsPerPage: number) => {
   orderListPagination.value.page = page
   orderListPagination.value.quantity = itemsPerPage
   await fetchOrdersOfService(
      orderList,
      orderListFilters,
      orderListPagination,
      orderListLoading
   )
}

onMounted(async () => {
   await fetchOrdersOfService(
      orderList,
      orderListFilters,
      orderListPagination,
      orderListLoading
   )
})
</script>
