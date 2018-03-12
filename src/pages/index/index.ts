import Vue from 'vue';
import app from './app.vue';
import * as filters from './filters';
import store from './store';
import router from './router';

// import { PayKeyboard } from '../../components/vue/index.js'
// console.log(PayKeyboard);
// Vue.use(PayKeyboard)
import mei from "../../components/index";
Vue.use(mei);

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
});
