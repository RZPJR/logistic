<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col class="fs24 bold">
                    {{ dataItems.code }}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <v-btn
                        elevation="0"
                        rounded
                        depressed
                        small
                        class="no-caps mb4"
                        :color="statusMaster('new')"
                    >
                        New
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
                            <v-list-item data-unq="controlTower-button-historyLog">
                                <v-list-item-content>History</v-list-item-content>
                            </v-list-item>
                            <v-list-item data-unq="controlTower-button-cancelDrsi">
                                <v-list-item-content>Cancel</v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" class="-mb25">
                    <DetailRowNew :name="'Courier'" :value="dataItems.courier.name" />
                </v-col>
                <v-col cols="12" md="6">
                    <v-row class="mb1">
                        <v-col>
                            <div class="text-black60">Phone Number</div>
                        </v-col>
                        <v-col>
                            <div class="d-flex justify-end">
                                <a
                                    v-bind:href="'https://wa.me/' + dataItems.courier.phone +'?text=%2APesan%20dari%20EdenFarm%20Control%20Tower%3A%2A%0A'"
                                    target="_blank"
                                >
                                    +62{{dataItems.courier.phone ? dataItems.courier.phone : ''}}
                                </a>
                                <v-img 
                                    :src="waIcon"
                                    max-height="25"
                                    max-width="25"
                                    class="ml10"
                                ></v-img>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider />
                </v-col>
                <v-col cols="12" md="6" class="-mt12 -mb12">
                    <DetailRowNew :name="'Vendor'" :value="dataItems.courier.courier_vendor_name" />
                </v-col>
                <v-col cols="12" md="6" class="-mt12">
                    <DetailRowNew :name="'Vehicle'" :value="dataItems.courier.vehicle_profile_name" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'License Plate'" :value="dataItems.courier.license_plate" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Warehouse'" :value="dataItems.courier.warehouse_name" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Start Time'" :value="formatTime(dataItems.started_at)" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Finish Time'" :value="formatTime(dataItems.finished_at)" />
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row>
                <v-col cols="12" md="6">
                    <v-row>
                        <div class="flex-justify-center">
                            <v-col>
                                <!-- Total SO: {{ courierData.total_sales_order ? courierData.total_sales_order : 0 }}
                                |
                                Delivery Return: {{ courierData.total_delivery_return ? courierData.total_delivery_return : 0 }}
                                |
                                Self-Pickup: {{ courierData.total_self_pickup ? courierData.total_self_pickup : 0 }}
                                | -->
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import waIcon from "../../assets/img/whatsapp-icon.svg";

    export default { 
        data() {
            return {
                waIcon
            }
        },
        created() {
            this.renderdata()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData()
                }
            });
        },
        computed: {
            ...mapState({
                dataItems: state => state.controlTower.detail_control_tower.data.items,
            }),
        },
        methods: {
            ...mapActions([
                'fetchControlTowerDetail',
                'fetchCourierDetail'
            ]),
            renderdata() {
                this.fetchControlTowerDetail({id: this.$route.params.id})
                this.fetchCourierDetail({id: this.$route.params.id})
            },
        },
    }
</script>