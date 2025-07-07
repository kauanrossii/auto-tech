<template>
  <BaseTable :total="10" :current-page="1" :limit="10" :columns="tableHeaders" :rows="customers" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ICustomerDto from "../services/dtos/ICustomerDto";
import BaseTable from "../../../components/BaseTable.vue";
import ITableColumn from "../../shared/models/components/ITableColumn";
import { ColumnType } from "../../../data/enums/ColumnType";
import { PersonType } from "../models/constants/CustomerType";

const paginatedCustomers = ref<ICustomerDto[]>([]);

const tableHeaders: ITableColumn[] = [
  { name: "Nome", type: ColumnType.TEXT },
  { name: "Tipo de Pessoa", type: ColumnType.ENUM, enum: PersonType },
  { name: "Telefone", type: ColumnType.TEXT },
  { name: "Identificador", type: ColumnType.TEXT },
];

const customers = computed(() => {
  return paginatedCustomers.value.map(customer => {
    return { key: String(customer.id), dataColumns: Object.values(customer) };
  })
});
</script>
