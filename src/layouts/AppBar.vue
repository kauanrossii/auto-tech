<template>
   <v-navigation-drawer expand-on-hover permanent rail>
      <v-list density="compact">
         <v-list-item
            v-for="item in navigationsItems"
            class="text-left"
            :key="item.to"
            :to="{ name: item.to }"
            :prepend-icon="item.icon"
            :title="item.title"
         >
         </v-list-item>
      </v-list>
   </v-navigation-drawer>
</template>

<script setup lang="ts">
import { RoutesNames } from "@src/router/routes-names"
import { ref } from "vue"

const navigationsItems = ref([
   { title: "Início", to: RoutesNames.home, icon: "mdi-home" },
   {
      title: "Ordens de Serviço",
      to: RoutesNames.ordersOfServiceList,
      icon: "mdi-file",
   },
   { title: "Clientes", to: RoutesNames.customersList, icon: "mdi-account" },
   { title: "Veículos", to: RoutesNames.vehiclesList, icon: "mdi-car" },
   { title: "Configurações", to: RoutesNames.configurations, icon: "mdi-cog" },
])
</script>
