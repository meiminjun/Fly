import Vue from 'vue';
import app from './app.vue';
import * as filters from './filters';
import store from './store';
import router from './router';

// import fly from "../../components/index";
import fly from "../../../dist/fly.js";
import "../../../dist/fly.css";
Vue.use(fly);

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
});
