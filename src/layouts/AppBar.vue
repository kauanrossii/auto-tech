<template>
   <v-navigation-drawer expand-on-hover permanent rail>
      <v-list density="compact">
         <v-list-item
            v-if="hasSystemConfigurationToDisplay"
            class="text-left"
            :title="systemConfigurationTitle"
         >
            <template #prepend>
               <v-avatar size="28" color="grey-lighten-3">
                  <v-img
                     v-if="systemConfiguration?.photoDataUrl"
                     :src="systemConfiguration.photoDataUrl"
                  ></v-img>
                  <v-icon v-else icon="mdi-domain"></v-icon>
               </v-avatar>
            </template>
         </v-list-item>

         <v-divider v-if="hasSystemConfigurationToDisplay" class="my-2"></v-divider>

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
import { computed, onMounted, ref } from "vue"
import { useSystemConfigurationComposable } from "@src/modules/configurations/composables/systemConfigurationComposable"

const { systemConfiguration, load } = useSystemConfigurationComposable()

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

const hasSystemConfigurationToDisplay = computed(() => {
   return Boolean(
      systemConfiguration.value?.companyName || systemConfiguration.value?.photoDataUrl
   )
})

const systemConfigurationTitle = computed(() => {
   return systemConfiguration.value?.companyName?.trim() || "Empresa"
})

onMounted(async () => {
   await load()
})
</script>
