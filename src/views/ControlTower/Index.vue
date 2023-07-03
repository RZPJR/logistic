<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                v-model="filter.search"
                                data-unq="controlTower-input-search"
                                dense
                                outlined
                                filled
                                placeholder="Search..."
                                prepend-inner-icon="search"
                                v-on="{ ...tooltip }"
                            ></v-text-field>
                        </template>
                        <span>Search by SO Code</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter ? 'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        data-unq="controlTower-btn-filterExpandLess"
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                    >
                        Hide <v-icon right> expand_less </v-icon>
                    </v-btn>
                    <v-btn 
                        data-unq="controlTower-btn-filterExpandMore"
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                    >
                        Show <v-icon right> expand_more </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="showFilter">
                <v-col cols="12" md="3">
                    <SelectWarehouse 
                        :data-unq="`controlTower-filter-site`"
                        @selected="siteSelected"
                        v-model="filter.warehouse_id"
                        :label="'Site'"
                        :norequired="true"
                        :dense="true"
                    ></SelectWarehouse>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        data-unq="controlTower-filter-deliveryDateModel"
                        ref="menu"
                        v-model="filter.delivery_date.model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    data-unq="controlTower-filter-deliveryDateInput"
                                    prepend-inner-icon="mdi-calendar"
                                    outlined
                                    maxlength="24"
                                    v-model="filter.delivery_date.input"
                                    dense
                                >
                                    <template v-slot:label>
                                        Delivery Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            data-unq="controlTower-filter-deliveryDate"
                            range
                            v-model="filter.delivery_date.value"
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                data-unq="controlTower-filter-setDeliveryDate"
                                text
                                color="primary"
                                @click="filter.delivery_date.model = false, fetchControlTowerList()"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectVendor
                        data-unq="controlTower-filter-vendor"
                        v-model="filter.vendor"
                        @selected="vendorSelected"
                        :norequired="true"
                        :dense="true"
                    ></SelectVendor>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectCourier
                        data-unq="controlTower-filter-courier"
                        v-model="filter.courier"
                        @selected="courierSelected"
                        :norequired="true"
                        :dense="true"
                    ></SelectCourier>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        data-unq="controlTower-filter-status"
                        v-model="filter.status"
                        :items="filter.statuses"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row>
                <v-col class="flex-justify-center fs25 bold">
                    <div>
                        <v-chip :color="statusMaster('cancelled')">
                            Emergency Courier: {{ courier.on_emergency }}
                        </v-chip>
                    </div>
                </v-col>
                <v-col class="d-flex justify-end">
                    <div class="mt20 mr16">Auto Refresh Every 1 Minutes</div>
                    <v-switch
                        data-unq="controlTower-switch-autoRefresh"
                        color="#50ABA3"
                        inset
                        v-model="filter.auto_refresh"
                        :true-value="1"
                        :false-value="2"
                    ></v-switch>
                </v-col>
            </v-row>
        </div>
        <div class="box-body">
            <v-row>
                <v-col cols="12" md="5">
                    <div class="scroll-list">
                        <div
                            v-if="control_tower_list.isLoadingData"
                            class="d-flex justify-center"
                        >
                            <div class="mt15">
                                <div class="text-center">
                                    <v-progress-circular
                                        :size="20"
                                        indeterminate
                                        color="#50ABA3"
                                    />
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="ma12 wp100" v-if="control_tower_list.data.items != ''">
                                <v-row
                                    v-for="(item, index) in dataItems"
                                    :key="index"
                                >
                                    <v-col :data-unq="`controlTower-list-drsi-${item.delivery_run_sheet.code}`">
                                        <div class="box-col-ep -mt10 -ml15 mr15">
                                            <v-row class="-mr30">
                                                <v-col>
                                                    <router-link
                                                        target="_blank"
                                                        :to="{ path: `/logistic/control-tower/detail/${item.delivery_run_sheet.id}` }"
                                                        data-unq="controlTower-button-detailDRSI"
                                                    >
                                                        {{item.delivery_run_sheet.code}}
                                                    </router-link>
                                                </v-col>
                                                <v-col class="d-flex justify-end align-end">
                                                    <v-btn
                                                        v-if="item.delivery_run_sheet.status == 1"
                                                        data-unq="controlTower-value-statusNew"
                                                        elevation="0"
                                                        rounded
                                                        depressed
                                                        small
                                                        class="no-caps mb4"
                                                        :color="statusMaster('new')"
                                                    >
                                                        New
                                                    </v-btn>
                                                    <v-btn
                                                        v-if="item.delivery_run_sheet.status == 2"
                                                        data-unq="controlTower-value-statusOnProgress"
                                                        elevation="0"
                                                        rounded
                                                        depressed
                                                        small
                                                        class="no-caps mb4"
                                                        :color="statusMaster('on_delivery')"
                                                    >
                                                        On Progress
                                                    </v-btn>
                                                    <v-btn
                                                        v-if="item.delivery_run_sheet.status == 3"
                                                        data-unq="controlTower-value-statusFinished"
                                                        elevation="0"
                                                        rounded
                                                        depressed
                                                        small
                                                        class="no-caps mb4"
                                                        :color="statusMaster('finished')"
                                                    >
                                                        Finished
                                                    </v-btn>
                                                    <v-menu offset-y>
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn 
                                                                icon
                                                                v-on="on"
                                                                data-unq="controlTower-button-actionButton"
                                                            >
                                                                <v-icon>mdi-dots-vertical</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-list class="bg-white">
                                                            <v-list-item
                                                                target="_blank"
                                                                :to="{ path: `/logistic/control-tower/detail/${item.delivery_run_sheet.id}` }"
                                                                data-unq="controlTower-button-detailDRSI"
                                                            >
                                                                <v-list-item-content>
                                                                    <v-list-item-title>Detail</v-list-item-title>
                                                                </v-list-item-content>
                                                                <v-list-item-icon>
                                                                    <v-icon>mdi-open-in-new</v-icon>
                                                                </v-list-item-icon>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="6" class="-mt15">
                                                    Courier:
                                                </v-col>
                                                <v-col data-unq="controlTower-value-courier" class="d-flex justify-end align-end -mt15">
                                                    {{item.courier.code}} - {{ item.courier.name }}
                                                </v-col>
                                                <v-col cols="6" class="-mt24">
                                                    Total SO:
                                                </v-col>
                                                <v-col data-unq="controlTower-value-totalSO" class="d-flex justify-end align-end -mt24">
                                                    {{item.completed_sales_order}} / {{item.total_sales_order}}
                                                </v-col>
                                                <v-col cols="6" class="-mt24">
                                                    Delivery Date:
                                                </v-col>
                                                <v-col data-unq="controlTower-value-deliveryDate" class="d-flex justify-end align-end -mt24">
                                                    {{ formatDate(item.delivery_run_sheet.delivery_date) }}
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-col>
                                </v-row>
                                <div class="d-flex justify-center mr25 mt20">
                                    <v-btn
                                        data-unq="controlTower-button-showMoreData"
                                        @click="filter.show_data += filter.load_data"
                                        v-if="filter.show_data < control_tower_list.data.items.length"
                                        class="no-caps fs12 white--text"
                                        rounded
                                        depressed
                                        color="#50ABA3"
                                    >
                                        Show More Data
                                    </v-btn>
                                </div>
                            </div>
                            <div v-else>
                                <div class="d-flex justify-center">
                                    <v-col>
                                        <div class="box-col-ep -mt10 -ml15 -mr15">
                                            <div class="text-center bold">No Data Available</div>
                                        </div>
                                    </v-col>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="7">
                    <div
                        v-if="control_tower_list.isLoadingMaps"
                        class="d-flex justify-center scroll-list"
                    >
                        <div class="mt15">
                            <div class="text-center">
                                <v-progress-circular
                                    :size="20"
                                    indeterminate
                                    color="#50ABA3"
                                />
                            </div>
                        </div>
                    </div>
                    <l-map
                        v-else
                        :options="map_options.options"
                        style="height: 500px; width: 100%"
                        :center="[
                            map_options.warehouse_location.lat || map_options.user_location.lat,
                            map_options.warehouse_location.lng || map_options.user_location.lng
                        ]"
                    >
                        <l-tile-layer
                            :options="map_options.options"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <v-marker-cluster
                            :options="map_options.cluster_options"
                        >
                            <l-marker
                                v-for="(item, idx) in courier.courier"
                                :key="idx"
                                :visible="true"
                                :draggable="false"
                                :lat-lng="[
                                    item.latitude,
                                    item.longitude
                                ]"
                            >
                                <l-icon
                                    :icon-size="[30, 40]"
                                    :icon-anchor="map_options.static_anchor"
                                    :icon-url="emergencyIcon"
                                    v-if="item.emergency_mode == 1 && item.latitude && item.longitude"
                                ></l-icon>
                                <l-icon
                                    :icon-size="[25, 40]"
                                    :icon-anchor="map_options.static_anchor"
                                    :icon-url="carIcon"
                                    v-if="item.emergency_mode == 2 && item.vehicle_profile_type === 'car' && item.latitude && item.longitude"
                                ></l-icon>
                                <l-icon
                                    :icon-size="[30, 40]"
                                    :icon-anchor="map_options.static_anchor"
                                    :icon-url="bikeIcon"
                                    v-if="item.emergency_mode == 2 && item.vehicle_profile_type === 'bike' && item.latitude && item.longitude"
                                ></l-icon>
                                <l-popup
                                    v-if="item.latitude && item.longitude"
                                >
                                    {{ item.name }} <br>
                                    {{ '+62' + item.phone_number }} <br>
                                    {{ item.license_plate }} <br>
                                    {{ formatDateTime(item.last_updated) }} ({{ formatHumanDiff(item.last_updated) }})
                                </l-popup>
                            </l-marker>
                        </v-marker-cluster>
                    </l-map>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import emergencyIcon from '../../assets/img/emergency.png';
    import bikeIcon from '../../assets/img/motorcycle.png';
    import carIcon from '../../assets/img/car.png';
    
    export default {
        name: "ControlTower",
        data() {
            return {
                showFilter: false,
                emergencyIcon,
                bikeIcon,
                carIcon
            }
        },
        created() {
            this.$store.commit("setWarehouseFilter", null)
            this.$store.commit("setVendorFilter", null)
            this.$store.commit("setCourierFilter", null)
            this.fetchControlTowerList()
            this.getUserPosition()
            this.fetchCourierList()
            this.getDate()
        },
        mounted() {
            let self = this
            setInterval(function () {
                if (self.filter.auto_refresh == 1) {
                    self.fetchCourierList()
                }
            }, 60000)
        },
        computed: {
            ...mapState({
                control_tower_list: state => state.controlTower.control_tower_list,
                filter: state => state.controlTower.control_tower_list.filter,
                map_options: state => state.controlTower.control_tower_list.map_options,
                courier: state => state.controlTower.control_tower_list.data.courier
            }),
            dataItems() {
                return this.control_tower_list.data.items.slice(0, this.filter.show_data)
            }
        },
        methods: {
            ...mapActions([
                'fetchControlTowerList',
                'fetchCourierList',
            ]),
            async getUserPosition() { // get user default location
                if (navigator.geolocation) {
                    // get GPS position
                    navigator.geolocation.getCurrentPosition(pos => {
                        // set the user location
                        this.map_options.user_location = {
                            lat: pos.coords.latitude,
                            lng: pos.coords.longitude
                        };
                    });
                }
            },
            getDate() { // get Default Data
                var date = new Date();
                var firstDay = new Date(Date.now() + ( 3600 * 1000 * 7));
                var end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
                this.filter.delivery_date.value = [firstDay.toISOString().substr(0, 10), end.toISOString().substr(0, 10)]
                this.fetchControlTowerList()
            },
            vendorSelected(d) { // select vendor
                this.$store.commit("setVendorFilter", null)
                if (d) {
                    this.$store.commit("setVendorFilter", d.id)
                }
                this.fetchControlTowerList()
                this.fetchCourierList()
            },
            courierSelected(d) { // select courier
                this.$store.commit("setCourierFilter", null)
                if (d) {
                    this.$store.commit("setCourierFilter", d.id)
                }
                this.fetchControlTowerList()
                this.fetchCourierList()
            },
            siteSelected(d) { // select site
                this.$store.commit("setWarehouseFilter", null)
                if (d) {
                    this.$store.commit("setWarehouseFilter", d.id)
                }
                this.fetchControlTowerList()
                this.fetchCourierList()
            }
        },
        watch: {
            'filter.delivery_date.input': { // for filter by date input format
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.filter.delivery_date.value[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.filter.delivery_date.value[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.filter.delivery_date.value[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                        }
                    }
                },
                deep: true
            },
            'filter.delivery_date.value': { // for filter by date input value
                handler: function (val) {
                    if (val) {
                        this.filter.delivery_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
            'filter.status': {
                handler: function (val) {
                    if(val){
                        this.$store.commit('setStatusFilter', val)
                        this.fetchControlTowerList()
                    }
                },
                deep: true
            },
        }
    }
</script>