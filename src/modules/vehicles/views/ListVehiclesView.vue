<template>
    <h1>List of vehicles</h1>
    <ul>
        <li v-for="vehicle in vehicles">
            {{ vehicle }}
        </li>
    </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const vehicles = ref([]);

onMounted(async () => {
    vehicles.value = await window.myApi.listVehicles();
})
</script>