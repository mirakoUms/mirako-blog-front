<template>
  <div class="admin-layout">
    <h1>Admin Dashboard</h1>
    <nav class="flex gap-4 mb-4">
      <router-link v-for="item in childRoutes" :key="item.path" :to="`/admin/${item.path}`"
        class="px-3 py-1 rounded hover:bg-gray-200" active-class="bg-gray-300">
        &nbsp;{{ item.meta.title }}
      </router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const childRoutes = route.matched[0].children.filter(route => route.name !== "Edit");
</script>

<style scoped>
.admin-layout {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

nav {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
}

router-link {
  text-decoration: none;
  color: #333;
}


router-link.active-class {
  font-weight: bold;
}

main {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
</style>
