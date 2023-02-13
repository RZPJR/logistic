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
        state.control_tower_list.isLoadingData = payload;
        return state;
    },
    // get data Detail Control Tower
    setControlTowerDetail: function(state, payload) {
        state.detail_control_tower.data.items = payload;
        return state;
    },
    // get data DRSI Detail Control Tower
    setCourierDetail: function(state, payload) {
        state.detail_control_tower.data.dataDrs = payload;
        return state;
    },
    // setting preload Detail Control Tower
    setPreloadControlTowerDetail: function(state, payload) {
        state.detail_control_tower.isLoadingDetail = payload;
        return state;
    },
};

export default mutations;