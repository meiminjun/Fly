import Vue from 'vue';
import app from './app.vue';
import * as filters from './filters';
import store from './store';
import router from './router';

import mei from "../../components/index";
Vue.use(mei);

import "../../../dist/fly.css";
import "../../../dist/fly.js";

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
});
