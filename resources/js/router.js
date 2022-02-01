import Vue from "vue";
import VueRouter from "vue-router";
import Gate from "./gate";

Vue.prototype.$gate = new Gate(window.user);
const gate = Vue.prototype.$gate;

Vue.use(VueRouter);

const routes = [
    {
        path: "/dashboard",
        component: require("./components/Dashboard.vue").default,
    },
    {
        path: "/developer",
        component: gate.isAdmin()
            ? require("./components/Developer.vue").default
            : require("./components/Unauthorized.vue").default,
    },
    {
        path: "/users",
        component: require("./components/Users.vue").default,
    },
    {
        path: "/profile",
        component: require("./components/Profile.vue").default,
    },
    {
        path: "*",
        component: require("./components/NotFound.vue").default,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
