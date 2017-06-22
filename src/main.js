import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'

Vue.use(iView);

new Vue({
    el: '#app',
    render: h => h(App)
})
