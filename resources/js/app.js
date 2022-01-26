require("./bootstrap");

window.Vue = require("vue").default;

import router from "./router";

Vue.filter("capitalize", function (value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

const app = new Vue({
    el: "#app",
    router,
});
