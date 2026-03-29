<template>
   <v-app>
      <v-layout full-height>
         <app-bar></app-bar>
         <app-view></app-view>
      </v-layout>
   </v-app>
</template>

<script setup lang="ts">
import AppBar from "./AppBar.vue"
import AppView from "./AppView.vue"
</script>
