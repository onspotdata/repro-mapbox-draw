import Vue from 'vue';
import App from './App.vue';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
