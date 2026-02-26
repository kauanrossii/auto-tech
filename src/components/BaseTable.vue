<template>
   <v-data-table-server
      hover
      :loading-text="loadingText"
      :headers="headers"
      :items="items"
      :items-length="itemsLength"
      :page="page"
      :items-per-page="itemsPerPage"
      :items-per-page-options="itemsPerPageOptions"
      :loading="loading"
      @update:options="$emit('update:options', $event)"
   >
      <template #top v-if="$slots.top">
         <slot name="top"></slot>
      </template>

      <template #[`item.actions`]="{ item }" v-if="$slots.actions">
         <slot name="actions" :item="item"></slot>
      </template>

      <template #[`item.actions`]="{ item }" v-else>
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
                     @click="$emit('action:view', item.id)"
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
                     @click="$emit('action:edit', item.id)"
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
                     @click="$emit('action:delete', item.id)"
                  ></v-btn>
               </template>
            </v-tooltip>
         </div>
      </template>
   </v-data-table-server>
</template>

<script setup lang="ts">
import { DataTableHeader } from "vuetify"

interface Props {
   headers: DataTableHeader[]
   items: any[]
   itemsLength: number
   page: number
   itemsPerPage: number
   itemsPerPageOptions?: number[]
   loading?: boolean
   loadingText?: string
}

withDefaults(defineProps<Props>(), {
   itemsPerPageOptions: () => [10, 25, 50],
   loading: false,
   loadingText: "Carregando dados",
})

defineEmits<{
   "update:options": [
      {
         page: number
         itemsPerPage: number
         sortBy: any[]
         groupBy: any[]
         search: string
      },
   ]
   "action:view": [id: number]
   "action:edit": [id: number]
   "action:delete": [id: number]
}>()
</script>
