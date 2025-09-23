<template>
  <div class="error-page">
    <h1>Error {{ errorCode }}</h1>
    <p>{{ errorMessage }}</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script setup>  
import { useRoute } from 'vue-router';
const route = useRoute();
const errorCode = route.query.code;
const errorMessage = route.query.message;
</script>