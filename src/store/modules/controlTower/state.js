const state = {
  // Control Tower Index
  control_tower_list: {
    isLoadingData: false,
    isLoadingMaps: false,
    filter: {
        search: '',
        filter: false,
        warehouse_id: null,
        vendor: null,
        courier: null,
        status: 2.1,
        statuses: [
            {
                text: 'All Status',
                value: 999
            },
            {
                text: 'On Progress',
                value: 2.1
            },
            {
                text: 'Finished',
                value: 3
            }
        ],
        show_data: 10,
        load_data: 10,
        auto_refresh: 2,
        delivery_date: {
            model: '',
            input: '',
            value: []
        },
    },
    total_emergency: 0,
    model_dialog: false,
    overlay: false,
    cancel_data: '',
    map_options: {
        options: { // setting from plugin
            zoom: 10,
            maxZoom: 19,
            minZoom: 5,
            maxNativeZoom: 19
        },
        warehouse_location: {
            lat: 0,
            lng: 0
        },
        user_location: {
            lat: 0,
            lng: 0
        },
        cluster_options: { // setting from plugin
            disableClusteringAtZoom: 20,
            maxClusterRadius: 50
            
        },
        static_anchor: [16, 37],
    },
    data: {
        items: [{
            total_sales_order: 0,
            completed_sales_order: 0,
            delivery_run_sheet: {
                name: ''
            },
            courier: {
                code: '',
                name: ''
            },
            sales_order: {
                code: '',
                delivery_date: ''
            }
        }],
        courier: [{
            latitude: 0,
            longitude: 0
        }],
    },
    note: {
        note: ''
    }
  },
  // control Tower Detail
  detail_control_tower: {
    isLoadingData: false,
    isLoadingMaps: false,
    error_messages: '',
    filter: {
        show_counted: 1,
        current_page: 1,
        disabled_next: false,
        disabled_prev: false,
        cancel_bulk_dialog: false,
        overlay: false,
        detail_dialog: false,
    },
    map_options: {
        user_location: {
            lat: 0,
            lng: 0
        },
        options: { // setting from plugin
            zoom: 10,
            maxZoom: 19,
            minZoom: 5,
            maxNativeZoom: 19
        },
        cluster_options: { // setting from plugin
            disableClusteringAtZoom: 20,
            maxClusterRadius: 50
        },
        static_anchor: [16, 37],
    },
    data: {
        items: {
            code: '',
            courier: {
                code: '',
                name: '',
                phone_number: '',
                license_plate: '',
                vehicle_profiles: {
                    name: '',
                    courier_vendor: {
                        name: '',
                        warehouse: {
                            name: ''
                        }
                    }
                }
            },
            starting_latitude: 0,
            starting_longitude: 0,
        },
        start_time: '',
        finish_time: '',
        total_sales_order: '',
        total_return: '',
        total_self_pickup: '',
        data_drs: {
            note: '',
            status: '',
            courier: {
                emergency_mode: 0,
                latitude: 0,
                longitude: 0,
            },
            delivery_run_sheet: {
                started_at: '',
                finished_at: '',
                arrival_time: ''
            },
            sales_order: {
                id: '',
                code: '',
                delivery_date: '',
                branch: {
                    name: '',
                    phone_number: '',
                    shipping_address: ''
                },
                wrt: {
                    name: ''
                },
                order_type: {
                    name: ''
                },
                customer_latitude: 0,
                customer_longitude: 0,
            },
        },
        cancel_bulk: {
            note: '',
            show_cancel_bulk_modal: false,
            success: false,
            error: {}
        },
        cancel_item: {
            id: 0,
            note: '',
            show_cancel_modal: false,
            success: false,
            error: {}
        },
        data_auditLog: {},
        detail_so: {
            note: '',
            money_received: '',
            recipient_name: '',
            started_at: '',
            finished_at: '',
            arrival_time: '',
            unpunctual_detail: '',
            unpunctual_reason_value: '',
            far_delivery_reason: '',
            sales_order: {
                code: '',
                delivery_date: '',
                shipping_address: '',
                total_charge: '',
                vou_disc_amount: '',
                point_redeem_amount: '',
                delivery_fee: '',
                branch: {
                    name: '',
                    phone_number: '',
                    sub_district: {
                        concat_address: '',
                        postal_code: ''
                    }
                },
                sales_inovoice: [
                    {
                        total_charge: ''
                    }
                ],
                wrt: {
                    name: ''
                },
                term_payment_sls: {
                    name: ''
                }
            },
            delivery_run_return: {},
            postpone_delivery_log: {}
        },
        postponed_delivery: [{
            postpone_reason: '',
            postpone_evidence: '',
            started_at: '',
            postponed_at: '',
        }],
        delivery_return: [{
            delivery_run_return_item: [{
                return_evidence: '',
                receive_qty: '',
                subtotal: '',
                return_reason_value: '',
                delivery_order_item: {
                    deliver_qty: '',
                    product: {
                        name: '',
                        uom: {
                            name: ''
                        }
                    }
                }
            }],
            total_charge: '',
            total_price: '',
        }],
    },
    table_headers: {
        table_postpone: [
            {
                text: 'No.',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Reason',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Start Time',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Postponed Time',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Evidence (Image)',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
        ],
        table_return: [
            {
                text: 'No.',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Product',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'UOM',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Delivery Qty',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Receive Qty',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Total Price (Rp)',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Note',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Return Waste Image',
                class: 'grey--text text--darken-4',
                sortable: false
            }
        ]
    }
  }
};
  
  export default state;