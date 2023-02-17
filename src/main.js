import "./set-public-path";
import Vue from "vue";
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Http from "./services/http";
import vuetify from "./plugins/vuetify";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import '@mdi/font/css/materialdesignicons.css'
// leaflet js for map
import { LMap, LTileLayer, LMarker, LTooltip, LImageOverlay, LIcon, LPolygon, LPopup } from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import './assets/custom/main.css';
import { Icon } from 'leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-image-overlay', LImageOverlay);
Vue.component('l-icon', LIcon);
Vue.component('l-polygon', LPolygon);
Vue.component('l-popup', LPopup);
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import { Components } from "@vue-mf/global";
import Vuetify from "vuetify/lib";
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;
Vue.use(VueToast);
Vue.use(Vuetify);

Vue.mixin({
  components: Components,
});

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    created: () => Http.init(),
    render: h => h(App),
    vuetify,
    router,
    store
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
