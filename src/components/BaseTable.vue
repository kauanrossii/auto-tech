<template>
  <v-container class="w-75 d-flex flex-column ga-6">
    <v-sheet class="w-100 d-flex justify-end">
        <p>{{ total }} registros encontrados</p>
    </v-sheet>
    <v-table>
      <thead>
        <tr>
          <th v-for="column in rows[0].columns" :key="column.name">
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.key">
          <td v-for="column in row.columns" :key="column.name">
            <template v-if="column.type == ColumnType.TEXT">
              {{ column.value }}
            </template>
            <template v-else-if="column.type == ColumnType.DATE">
              {{ column.value }}
            </template>
            <template v-else-if="column.type == ColumnType.DATETIME">
              {{ column.value }}
            </template>
            <template v-else>
              <v-tooltip :text="column.enum?.subtitle">
                <template #activator="{ props }">
                    <v-chip v-bind="props" prepend-icon="mdi-information">
                        {{ column.enum?.title }}
                    </v-chip>
                </template>
              </v-tooltip>
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import ITableRow from "../data/components/ITableRow";
import { ColumnType } from "../data/enums/ColumnType";

defineProps<{
  total: Number;
  currentPage: Number;
  limit: Number;
  rows: ITableRow[];
}>();
</script>
