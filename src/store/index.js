import Vue from "vue";
import Vuex from "vuex";

import controlTower from "./modules/controlTower";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    controlTower
  }
});
