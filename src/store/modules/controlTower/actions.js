import axios from "axios";
import http from "../../../services/http";

const actions = {
    // DRS List (Control Tower)
    fetchControlTowerList: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadControlTowerList', true);
        try {
            // let status = state.controlTower.filter.status === 999 ? '' : state.controlTower.filter.status
            // let warehouse = state.controlTower.filter.warehouse_id === '' ? '' : state.controlTower.filter.warehouse_id
            // let vendor = state.controlTower.filter.courier_vendor_id === '' ? '' : state.controlTower.filter.courier_vendor_id
            // let courier = state.controlTower.filter.courier_id === '' ? '' : state.controlTower.filter.courier_id
            let delivery_date_start = ''
            let delivery_date_end = ''
            if (state.control_tower_list.filter.delivery_date.value.length > 0) {
                if (state.control_tower_list.filter.delivery_date.value.length == 1) {
                    delivery_date_start = state.control_tower_list.filter.delivery_date.value[0]
                    delivery_date_end = state.control_tower_list.filter.delivery_date.value[0]
                } else {
                    delivery_date_start = state.control_tower_list.filter.delivery_date.value[0]
                    delivery_date_end = state.control_tower_list.filter.delivery_date.value[1]
                }
            }
            const response = await http.get("/control_tower", {
                params: {
                    page: 1,
                    limit: 100,
                    site_id: 1,
                    start_delivery_date: delivery_date_start,
                    end_delivery_date: delivery_date_end,
                }
            });
            if (response.data.data) commit('setControlTowerList', response.data.data);
            commit('setPreloadControlTowerList', false);
        } catch (error) {
            commit('setPreloadControlTowerList', false);
        }
    },
    // Courier List for Map (Control Tower)
    fetchCourierList: async ({ state, commit, dispatch }, payload) => {
        let data = {
            "site_id" : 1
        }
        let config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        try {
            const response = await http.post("/control_tower", data);
            if (response.data.data) commit('setCourierList', response.data.data);
            // commit('setPreloadControlTowerList', false);
        } catch (error) {
            // commit('setPreloadControlTowerList', false);
            console.log(error)
        }
    },
    // detail Control Tower
    fetchControlTowerDetail: async ({ state, commit, dispatch }, payload) => {
    }
};

export default actions;