<template>
  <v-container class="w-75 d-flex flex-column ga-6">
    <v-sheet class="w-100 d-flex justify-end">
        <p>{{ total }} registros encontrados</p>
    </v-sheet>
    <v-table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.name">
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.key">
          <td v-for="(rowColumn, index) in row.dataColumns" :key="index">
            <template v-if="columns[index].type == ColumnType.TEXT">
              {{ rowColumn }}
            </template>
            <template v-else-if="columns[index].type == ColumnType.DATE">
              {{ rowColumn }}
            </template>
            <template v-else-if="columns[index].type == ColumnType.DATETIME">
              {{ rowColumn }}
            </template>
            <template v-else>
              <v-tooltip :text="columns[index].enum?.find(en => en.value == rowColumn)?.subtitle">
                <template #activator="{ props }">
                    <v-chip v-bind="props" prepend-icon="mdi-information">
                        {{ columns[index].enum?.find(en => en.value == rowColumn)?.title }}
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
import ITableRow from "../modules/shared/models/components/ITableRow";
import { ColumnType } from "../data/enums/ColumnType";
import ITableColumn from "../modules/shared/models/components/ITableColumn";

defineProps<{
  total: Number;
  currentPage: Number;
  limit: Number;
  columns: ITableColumn[];
  rows: ITableRow[];
}>();
</script>
