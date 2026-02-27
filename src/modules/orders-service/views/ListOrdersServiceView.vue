<template>
   <v-sheet class="w-100 h-100 d-flex justify-center">
      <v-toolbar flat class="bg-white">
         <v-toolbar-title>Clientes cadastrados</v-toolbar-title>

         <v-btn
            class="me-2"
            variant="elevated"
            rounded="sm"
            color="primary"
            text="Cadastrar ordem de serviço"
            @click="handleCreateOrderOfService"
         ></v-btn>
      </v-toolbar>
   </v-sheet>
</template>

<script setup lang="ts">
import router from "@src/router/router"
import { RoutesNames } from "@src/router/routes-names"

function handleCreateOrderOfService() {
   router.push({ name: RoutesNames.ordersOfServiceCreate })
}
</script>
