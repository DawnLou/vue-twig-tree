import Vue from "vue";
import Example from "./Example.vue";
import { VueTwigTree } from "/src";

Vue.config.productionTip = false
Vue.use(VueTwigTree)

new Vue({
  render: h => h(Example),
}).$mount('#app')
