<template>
    <nav class="nav">
        <div class="nav-container" v-if="!isMobile">
            <router-link v-for="route in childRoutes" :key="route.name" :to="route.path" class="nav-link" 
            :class="{ active: route.name === router.currentRoute.value.name || (route.name === 'Homepage' && router.currentRoute.value.name === 'Index') }">{{ route.meta.title }}</router-link>
        </div>

        <div class="nav-container-mobile-menu" @click="isMenuOpen = !isMenuOpen" v-if="isMobile">
            <span>Menu</span>
            <div class="nav-container-mobile-menu-icon" :class="{ open: isMenuOpen }">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="nav-container-mobile" v-if="isMobile && isMenuOpen">
            <router-link v-for="route in childRoutes" :key="route.name" :to="route.path" class="nav-link-mobile">{{
                route.meta.title }}</router-link>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const isMobile = ref(window.innerWidth <= 768);
const router = useRouter();
const childRoutes = router.getRoutes().filter(route => route.meta.title === 'Home' || route.meta.title === 'Posts' || route.meta.title === 'About').reverse();
const isMenuOpen = ref(false);

window.addEventListener("resize", () => {
    isMobile.value = window.innerWidth <= 768;
});

window.addEventListener("click", (event) => {
    if (isMenuOpen.value && !event.target.closest('.nav-container-mobile-menu')) {
        isMenuOpen.value = false;
    }
});

onMounted(() => {
    isMenuOpen.value = false;
});
</script>

<style scoped>
.nav {
    padding: 1rem 0;
}

.nav-container {
    display: flex;
    justify-content: center;
    background-color: #191919;
    width: 740px;
    height: 39px;
    margin: 0 auto;
    gap: 2rem;

    border-radius: 8px;
    align-items: center;
}

.nav-container-mobile {
    display: flex;
    flex-direction: column;
    justify-content: left;
    background-color: #191919;
    width: 92vw;
    margin: 0 auto;
    margin-top: 11px;
    padding: 3px 0 3px 0;

    border-radius: 8px;
    align-items: center;
}

.nav-container-mobile-menu {
    display: flex;
    justify-content: center;
    background-color: #191919;
    width: 92vw;
    height: 39px;
    margin: 0 auto;
    gap: 3px;

    border-radius: 8px;
    align-items: center;

    font-weight: bold;
    transition: transform 0.2s ease-in-out 0.1s;
}

.nav-link {
    color: #c3c3c3;
    font-weight: bold;
    transition: transform 0.2s ease-in-out 0.1s;
}

.nav-link:hover {
    text-decoration: underline 2px;
}

.nav-link.active {
    transform: translateY(-2px);
}

.nav-link-mobile {
    width: 92%;
    height: 32px;
    line-height: 32px;

    color: #c3c3c3;
    font-weight: bold;
    transition: transform 0.2s ease-in-out 0.1s;
}

.nav-container-mobile-menu-icon {
    width: 18px;
    height: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    cursor: pointer;
}

.nav-container-mobile-menu-icon span {
    display: block;
    height: 3px;
    background-color: #c3c3c3;
    border-radius: 1px;
    transition: all 0.4s ease;
}

.nav-container-mobile-menu-icon span:nth-child(1) {
    width: 100%;
}

.nav-container-mobile-menu-icon span:nth-child(2) {
    width: 70%;
    align-self: flex-start;
}

.nav-container-mobile-menu-icon span:nth-child(3) {
    width: 85%;
    align-self: flex-start;
}

.nav-container-mobile-menu-icon.open span:nth-child(1) {
    transform: rotate(45deg) translate(4px, 4px);
    width: 85%;
}

.nav-container-mobile-menu-icon.open span:nth-child(2) {
    transform: translateX(100%);
    opacity: 0;
}

.nav-container-mobile-menu-icon.open span:nth-child(3) {
    transform: rotate(-45deg) translate(3px, -3px);
    width: 85%;
}
</style>