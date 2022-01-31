require("./bootstrap");

window.Vue = require("vue").default;

import router from "./router";
import moment from "moment";
import VueProgressBar from "vue-progressbar";
import Swal from "sweetalert2";
import Vue from "vue";


const progressBarOptions = {
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
Vue.use(VueProgressBar, progressBarOptions);

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});
window.Swal = Swal;
window.Toast = Toast;

// Global filters
Vue.filter("capitalize", function (value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("formattedDate", function (date) {
    return moment(date).format("Do, MMM YYYY");
});

// Global obj to fire some custom events after user create/update/delete.
window.Fire = new Vue();

Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: "#app",
    router,
});
