<template>
        <b-nav align="center">
            <router-link to="/play"><i class="fas fa-play fa-3x"></i></router-link>
            <router-link to="/history"><i class="fas fa-history fa-3x"></i></router-link>
            <router-link to="/user"><i class="fas fa-user fa-3x"></i></router-link>
        </b-nav>
</template>

<script>
    export default {
        name: "Navbar",
    }
</script>

<style scoped>
    .nav {
        margin-bottom: 20px;
    }
    .nav>a {
        margin: 0 30px;
        color: black;
    }
</style>