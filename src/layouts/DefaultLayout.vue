<template>
   <v-app>
      <v-layout>
         <app-bar></app-bar>
         <app-view></app-view>
      </v-layout>
   </v-app>
</template>

<script setup lang="ts">
import AppBar from "./AppBar.vue"
import AppView from "./AppView.vue"
</script>
