<template>
        <b-nav align="center">
            <span>Angemeldet als: {{this.$store.getters.authenticatedUser.nickname}}</span>
            <router-link to="/play"><i class="fas fa-play fa-3x"></i></router-link>
            <router-link to="/history"><i class="fas fa-history fa-3x"></i></router-link>
            <router-link to="/user"><i class="fas fa-user fa-3x"></i></router-link>
            <button class="btn" variant="" @click="logout"><i class="fas fa-sign-out-alt fa-3x"></i></button>
        </b-nav>
</template>

<script>
    import { AUTH_LOGOUT } from "@/store/actions/auth";
    export default {
        name: "Navbar",
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT)
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        }
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