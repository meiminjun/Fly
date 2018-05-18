import index from './index.vue';
import Vue from 'vue'
import VueRouter from 'vue-router'
import keyboardpay from './keyboard-pay.vue'
import keyboard from './keyboard.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: index}, // 首页
        {path: '/keyboard-pay', component: keyboardpay}, // 支付框
        {path: '/keyboard', component: keyboard}, // 支付框
        {path: '*', redirect: '/'}
    ]
});

// router.afterEach(router => {
//     document.documentElement.scrollTop = document.body.scrollTop = 0;
// });

export default router;
