import Vue from 'vue';
import VueRouter from 'vue-router'
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import PlayView from "../views/PlayView";
import UserView from "../views/UserView";
import HistoryView from "../views/HistoryView";
import GameView from "@/views/GameView";
import NewGameView from "@/views/NewGameView";
/*import store from "../store";
import {AUTH_CHECK} from "../store/actions/auth";*/

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "App",
        redirect: "/play",
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterView,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/play',
        name: "Play",
        component: PlayView,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/history',
        name: "History",
        component: HistoryView,
        meta: {requiresAuth: true}
    },
    {
        path: '/user',
        name: "User",
        component: UserView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/game",
        name: "Game",
        component: GameView,
        props: true
    },
    {
        path: "/new_game",
        name: "NewGame",
        component: NewGameView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

//router.addRoutes(routes)


//prevent user from accessing views if they are not authenticated
/*router.beforeEach(async (to, from, next) => {
        //Check if the user is authenticated --> async
        await store.dispatch(AUTH_CHECK);
        if (to.matched.some((route) => route.meta.requiresAuth && to.name !== "Login")) {
            console.log(to.name + " - isAuthenticated: " + store.getters.isAuthenticated)
            if (!store.getters.isAuthenticated) {
                next({name: "Login"});
            } else {
                next();
            }
        } else {
           next();
        }
});*/

export default router;
