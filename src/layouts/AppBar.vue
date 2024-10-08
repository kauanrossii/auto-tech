<template>
  <v-navigation-drawer persistent location="left">
    <v-list-item
      v-for="item in navigationsItems"
      :key="item.to"
      :to="item.to"
      :prepend-icon="item.icon"
      :title="item.title"
      class="text-left"
    ></v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navigationsItems = ref([
  { title: "Ordens de Serviço", to: "/orders-service", icon: "mdi-file" },
  { title: "Clientes", to: "/customers", icon: "mdi-account" },
  { title: "Veículos", to: "/vehicles", icon: "mdi-car" },
  { title: "Configurações", to: "/configurations", icon: "mdi-cog" },
]);
</script>
