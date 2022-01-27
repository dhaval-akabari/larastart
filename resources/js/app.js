require("./bootstrap");

window.Vue = require("vue").default;

import moment from "moment";
import VueProgressBar from "vue-progressbar";
// import Vue from "vue";
import router from "./router";

const options = {
    color: "#bffaf3",
    failedColor: "red",
    thickness: "5px",
    transition: {
        speed: "0.5s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};
Vue.use(VueProgressBar, options);

// Global filters
Vue.filter("capitalize", function (value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formattedDate", function (date) {
    return moment(date).format("Do, MMM YYYY");
});

const app = new Vue({
    el: "#app",
    router,
});
