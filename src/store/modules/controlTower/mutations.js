const mutations = {
    // List Control Tower
    setControlTowerList: function(state, payload) { // get data DRS for Index Control Tower
        state.control_tower_list.data.items = payload;
        return state;
    },
    setCourierList: function(state, payload) { // get data Courier for Maps Index Control Tower
        state.control_tower_list.data.courier = payload;
        return state;
    },
    setPreloadControlTowerList: function(state, payload) { // setting preload Index Control Tower
        state.control_tower_list.isLoadingData = payload;
        return state;
    },
    setPreloadControlTowerMapsList: function(state, payload) { // setting preload Maps Index Control Tower
        state.control_tower_list.isLoadingMaps = payload;
        return state;
    },
    setWarehouseFilter: function(state, payload) { // set warehouse filter Index Control Tower
        state.control_tower_list.filter.warehouse_id = payload;
        return state;
    },
    
    // Detail Control Tower
    setControlTowerDetail: function(state, payload) { // get data Detail Control Tower
        state.detail_control_tower.data.items = payload;
        return state;
    },
    setCourierDetail: function(state, payload) { // get data DRSI Detail Control Tower
        state.detail_control_tower.data.data_drs = payload;
        return state;
    },
    setPreloadControlTowerDetail: function(state, payload) { // setting preload Detail Control Tower
        state.detail_control_tower.isLoadingData = payload;
        return state;
    },
    setPreloadControlTowerMaps: function(state, payload) { // setting preload Maps Detail Control Tower
        state.detail_control_tower.isLoadingMaps = payload;
        return state;
    },
    setErrorMessage: function(state, payload) { // error message for Maps Detail Control Tower
        state.detail_control_tower.error_messages = payload;
        return state;
    },
    setCancelId: function(state, payload) { // set id for cancel DRSI
        state.detail_control_tower.data.cancel_item.id = payload;
        return state;
    },
    setCancelNote: function(state, payload) { // Note for cancel DRSI
        state.detail_control_tower.data.cancel_item.note = payload;
        return state;
    },
    setCancelSuccess: function(state, payload) { // success message for cancel DRSI
        state.detail_control_tower.data.cancel_item.success = payload;
        return state;
    },
    setShowCancelModal: function(state, payload) { // show cancel modal dialog
        state.detail_control_tower.data.cancel_item.show_cancel_modal = payload;
        return state;
    },
    setCancelBulkId: function(state, payload) { // set id for cancel bulk DRSI
        state.detail_control_tower.data.cancel_bulk.id = payload;
        return state;
    },
    setCancelBulkNote: function(state, payload) { // Note for cancel bulk DRSI
        state.detail_control_tower.data.cancel_bulk.note = payload;
        return state;
    },
    setCancelBulkSuccess: function(state, payload) { // success message for cancel DRSI
        state.detail_control_tower.data.cancel_bulk.success = payload;
        return state;
    },
    setShowCancelBulkModal: function(state, payload) { // show cancel bulk modal dialog
        state.detail_control_tower.data.cancel_bulk.show_cancel_bulk_modal = payload;
        return state;
    },
    setDisabledButton: function(state, payload) { // disable button for Detail DRSI
        state.detail_control_tower.filter.disabled_next = payload.disabled_next;
        state.detail_control_tower.filter.disabled_prev = payload.disabled_prev;
    },
    setPage: function(state, payload) {
        state.detail_control_tower.data.detail_so = payload.detail_so;
        state.detail_control_tower.data.delivery_return = payload.delivery_return;
        state.detail_control_tower.data.postponed_history = payload.postponed_history;
        state.detail_control_tower.filter.current_page = payload.current_page;
    }
};

export default mutations;