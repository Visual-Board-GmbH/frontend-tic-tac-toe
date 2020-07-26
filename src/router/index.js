import Vue from 'vue';
import VueRouter from 'vue-router'
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import PlayView from "../views/PlayView";
import UserView from "../views/UserView";
import HistoryView from "../views/HistoryView";
import App from "../App";

Vue.use(VueRouter);

const routes = [
  {path: "/", name: "App", component: App},
  {path: "/login", name: "Login", component: LoginView},
  {path: "/register", name: "Register", component: RegisterView},
  {path: '/play', name: "Play", component: PlayView},
  {path: '/history', name: "History", component: UserView},
  {path: '/user', name: "User", component: HistoryView}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});

export default router;
