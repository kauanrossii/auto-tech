<template><BaseTable :columns="tableHeaders" :rows="customers" /></template>

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

const customers: any[] = computed(() => {
    return paginatedCustomers.value.map(customer => {
        return Object.values(customer);
    })
});
</script>
