<template>
    <NavBar />
    <main class="main-content">
        <router-view />
    </main>
    <FooterLayout />
</template>
<script setup>
import FooterLayout from '../components/FooterLayout.vue';
import NavBar from '../components/NavBar.vue';
</script>