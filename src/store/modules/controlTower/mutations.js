const mutations = {
    // get data DRS for Index Control Tower
    setControlTowerList: function(state, payload) {
        state.control_tower_list.data.items = payload;
        return state;
    },
    // get data Courier for Maps Index Control Tower
    setCourierList: function(state, payload) {
        state.control_tower_list.data.courier = payload;
        return state;
    },
    // setting preload Index Control Tower
    setPreloadControlTowerList: function(state, payload) {
        state.control_tower_list.loading_data = payload;
        return state;
    },
    // setting preload Maps Index Control Tower
    setPreloadControlTowerMaps: function(state, payload) {
        state.control_tower_list.loading_maps = payload;
        return state;
    },
    // get data Detail Control Tower
    setControlTowerDetail: function(state, payload) {
        state.detail_control_tower.data.items = payload;
        return state;
    },
    // get data DRSI Detail Control Tower
    setCourierDetail: function(state, payload) {
        state.detail_control_tower.data.data_drs = payload;
        return state;
    },
    // setting preload Detail Control Tower
    setPreloadControlTowerDetail: function(state, payload) {
        state.detail_control_tower.loading_data = payload;
        return state;
    },
    // setting preload Maps Detail Control Tower
    setPreloadControlTowerMaps: function(state, payload) {
        state.detail_control_tower.loading_maps = payload;
        return state;
    },
    // error message for Maps Detail Control Tower
    setErrorMessage: function(state, payload) {
        state.detail_control_tower.error_messages = payload;
        return state;
    }
};

export default mutations;