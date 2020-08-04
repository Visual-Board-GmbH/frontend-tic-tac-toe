import Vue from 'vue';
import VueRouter from 'vue-router'
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import PlayView from "../views/PlayView";
import UserView from "../views/UserView";
import HistoryView from "../views/HistoryView";
import store from "../store"

Vue.use(VueRouter);

const routes = [
    {path: "/", name: "App", component: PlayView, meta: {requiresAuth: true}},
    {path: "/login", name: "Login", component: LoginView, meta: {requiresAuth: false}},
    {path: "/register", name: "Register", component: RegisterView, meta: {requiresAuth: false}},
    {path: '/play', name: "Play", component: PlayView, meta: {requiresAuth: true}},
    {path: '/history', name: "History", component: UserView, meta: {requiresAuth: true}},
    {path: '/user', name: "User", component: HistoryView, meta: {requiresAuth: true}}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

//router.addRoutes(routes)

//ToDo Check if the user is authenticated

//prevent user from accessing views if they are not authenticated
router.beforeEach((to, from, next) => {
    console.log(to);
    if (to.matched.some((route) => route.meta.requiresAuth && to.name !== "Login")) {
        console.log(to.name + " - isAuthenticated: " + store.getters.isAuthenticated)
        if (!store.getters.isAuthenticated) {
            next({name: "Login"});
        } else {
            next();
        }
    }
    next();
});

export default router;
