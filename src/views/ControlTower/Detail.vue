<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col class="fs24 bold">
                    {{ data.items.code }}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <v-btn
                        v-if="data.items.status == 1"
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
                        v-if="data.items.status == 2"
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
                        v-if="data.items.status == 3"
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
                    <DetailRowNew :name="'Courier'" :value="data.items.courier.name" />
                </v-col>
                <v-col cols="12" md="6">
                    <v-row class="mb1">
                        <v-col>
                            <div class="text-black60">Phone Number</div>
                        </v-col>
                        <v-col>
                            <div class="d-flex justify-end">
                                <a
                                    v-bind:href="'https://wa.me/' + data.items.courier.courier_phone_number +'?text=%2APesan%20dari%20EdenFarm%20Control%20Tower%3A%2A%0A'"
                                    target="_blank"
                                >
                                    +62{{ data.items.courier.courier_phone_number }}
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
                    <DetailRowNew :name="'Vendor'" :value="data.items.courier.courier_vendor_name" />
                </v-col>
                <v-col cols="12" md="6" class="-mt12">
                    <DetailRowNew :name="'Vehicle'" :value="data.items.courier.vehicle_profile_name" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'License Plate'" :value="data.items.courier.license_plate" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Warehouse'" :value="data.items.courier.warehouse_name" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Start Time'" :value="formatTime(data.items.started_at)" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Finish Time'" :value="formatTime(data.items.finished_at)" />
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row>
                <v-col cols="12" md="6">
                    <v-row>
                        <div class="flex-justify-center">
                            <v-col>
                                Total SO: {{ data.data_drs.total_sales_order ? data.data_drs.total_sales_order : 0 }}
                                |
                                Delivery Return: {{ data.data_drs.total_delivery_return ? data.data_drs.total_delivery_return : 0 }}
                                |
                                Self-Pickup: {{ data.data_drs.total_self_pickup ? data.data_drs.total_self_pickup : 0 }}
                                |
                            </v-col>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <div class="box-body">
            <v-row>
                <v-col cols="12" md="5">
                    <div class="scroll-list">
                        <div
                            class="d-flex justify-center"
                            v-if="control_tower_detail.loading_data"
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
                        <div class="ma12 wp100" v-else>
                            <v-row
                                v-for="(item, index) in data.data_drs.delivery_run_sheet_item"
                                :key="index"
                            >
                                <v-col>
                                    <div
                                        class="d-flex justify-center scroll-list fill-height"
                                        v-if="control_tower_detail.error_messages"
                                    >
                                        <div class="mt15">
                                            <div class="text-center">
                                                <v-col>
                                                    <div class="-mt24 -ml15 -mr15">
                                                        <div class="text-center bold">No Data Available</div>
                                                    </div>
                                                </v-col>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-col-ep -ml15 mr15 -mb10" v-else>
                                        <v-row class="-mr30">
                                            <v-col cols="12" md="6">
                                                <v-row>
                                                    <div class="flex-justify-center">
                                                        <v-col>
                                                            <v-btn
                                                                fab
                                                                depressed
                                                                x-small
                                                                class="bold mb4 mr20"
                                                                :color="statusMaster('new')"
                                                            >
                                                                <span class="fs12">{{ index + 1 }}</span>
                                                            </v-btn>
                                                            <router-link
                                                                data-unq="controlTower-link-dialogDrsi"
                                                                :to="`/logistic/control-tower/detail/${$route.params.id}`"
                                                                @click.native="data.detail_so = item, data.delivery_return = item.delivery_run_return, data.postponed_delivery = item.postpone_delivery_log, filter.detail_dialog = true, filter.current_page = index + 1, checkPage()"
                                                            >
                                                                <span class="-ml15">{{ item.sales_order.code }}</span>
                                                            </router-link>
                                                        </v-col>
                                                    </div>
                                                </v-row>
                                            </v-col>
                                            <v-col class="d-flex justify-end align-end">
                                                <v-btn
                                                    v-if="item.status == 1"
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
                                                    v-if="item.status == 2"
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
                                                    v-if="item.status == 3"
                                                    elevation="0"
                                                    rounded
                                                    depressed
                                                    small
                                                    class="no-caps mb4"
                                                    :color="statusMaster('finished')"
                                                >
                                                    Finished
                                                </v-btn>
                                                <v-btn
                                                    v-if="item.status == 4"
                                                    elevation="0"
                                                    rounded
                                                    depressed
                                                    small
                                                    class="no-caps mb4"
                                                    :color="statusMaster('draft')"
                                                >
                                                    Postponed
                                                </v-btn>
                                                <v-btn
                                                    v-if="item.status == 5"
                                                    elevation="0"
                                                    rounded
                                                    depressed
                                                    small
                                                    class="no-caps mb4"
                                                    :color="statusMaster('cancelled')"
                                                >
                                                    Failed
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
                                                            v-if="item.status != 3 && item.status != 5"
                                                            data-unq="controlTower-button-cancelDrsi"
                                                        >
                                                            <v-list-item-content>
                                                                <v-list-item-title>Cancel</v-list-item-title>
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col class="d-flex justify-end align-end">
                                                <v-btn
                                                    v-if="item.delivery_run_return"
                                                    elevation="0"
                                                    rounded
                                                    depressed
                                                    small
                                                    class="no-caps -mt16 mr10"
                                                    :color="statusMaster('failed')"
                                                >
                                                    Delivery Return
                                                </v-btn>
                                                <!-- <v-btn
                                                    v-if="item.sales_order.order_type.name == 'Self Pickup'"
                                                    elevation="0"
                                                    rounded
                                                    depressed
                                                    small
                                                    class="no-caps -mt16"
                                                    :color="statusMaster('failed')"
                                                >
                                                    Self-Pickup
                                                </v-btn> -->
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" class="-mt15">
                                                Delivery Date
                                            </v-col>
                                            <v-col class="d-flex justify-end align-end -mt15">
                                                {{ formatDate(item.sales_order.delivery_date) }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" class="-mt24">
                                                WRT
                                            </v-col>
                                            <v-col class="d-flex justify-end align-end -mt24">
                                                {{ item.sales_order.wrt_name }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" class="-mt24">
                                                Note
                                            </v-col>
                                            <v-col class="d-flex justify-end align-end -mt24">
                                                {{ item.note ? item.note : '-' }}
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="7">
                    <div
                        class="d-flex justify-center scroll-list fill-height"
                        v-if="control_tower_detail.loading_maps"
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
                        <div
                            class="d-flex justify-center scroll-list fill-height"
                            v-if="control_tower_detail.error_messages"
                        >
                            <div class="mt15">
                                <div class="text-center">
                                    <v-col>
                                        <div class="mt10 -ml15 -mr15">
                                            <div class="text-center bold">No Data Available</div>
                                        </div>
                                    </v-col>
                                </div>
                            </div>
                        </div>
                        <l-map
                            v-else
                            :options="map_options.options"
                            style="height: 500px; width: 100%;"
                            :center="[data.items.starting_latitude, data.items.starting_longitude]"
                        >
                            <l-tile-layer
                                :options="map_options.options"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <l-marker
                                :visible="true"
                                :draggable="false"
                                :lat-lng="[
                                    data.items.starting_latitude,
                                    data.items.starting_longitude
                                ]"
                            >
                                <l-icon
                                    :icon-size="[30, 40]"
                                    :icon-anchor="map_options.staticAnchor"
                                    :icon-url="emergencyIcon"
                                >
                                </l-icon>
                            </l-marker>
                        </l-map>
                    </div>
                </v-col>
            </v-row>
        </div>
        <v-dialog
            v-model="filter.detail_dialog"
            persistent
            max-width="1280"
        >
            <v-card class="pa-3">
                <v-row class="pa-3 mb30">
                    <v-col class="fs20 bold flex-justify-center mb20">
                        {{data.detail_so.sales_order.code}}
                    </v-col>
                    <v-col class="d-flex justify-end">
                        <span class="bold mr10 mt4">{{ filter.current_page }} / {{ data.data_drs.delivery_run_sheet_item ? data.data_drs.delivery_run_sheet_item.length : 0 }} Sales Order</span>
                        <v-btn
                            data-unq="controlTower-button-prevPage"
                            icon
                            class="-mr10 -mt3"
                            @click="prevPage"
                            :disabled="filter.disabledPrev"
                        >
                            <v-icon>
                                mdi-arrow-left-drop-circle-outline
                            </v-icon>
                        </v-btn>
                        <v-btn
                            data-unq="controlTower-button-nextPage"
                            icon
                            class="-mt3"
                            @click="nextPage"
                            :disabled="filter.disabledNext"
                        >
                            <v-icon>
                                mdi-arrow-right-drop-circle-outline
                            </v-icon>
                        </v-btn>
                        <span class="mr10 fs30 -mt10">|</span>
                        <v-btn
                            v-if="data.detail_so.status == 1"
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
                            v-if="data.detail_so.status == 2"
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
                            v-if="data.detail_so.status == 3"
                            elevation="0"
                            rounded
                            depressed
                            small
                            class="no-caps mb4"
                            :color="statusMaster('finished')"
                        >
                            Finished
                        </v-btn>
                        <v-btn
                            v-if="data.detail_so.status == 4"
                            elevation="0"
                            rounded
                            depressed
                            small
                            class="no-caps mb4"
                            :color="statusMaster('draft')"
                        >
                            Postponed
                        </v-btn>
                        <v-btn
                            v-if="data.detail_so.status == 5"
                            elevation="0"
                            rounded
                            depressed
                            small
                            class="no-caps mb4"
                            :color="statusMaster('cancelled')"
                        >
                            Failed
                        </v-btn>
                        <v-btn
                            icon
                            class="-mt1"
                            @click="filter.detail_dialog = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="-mt24">
                            <DetailRowNew :name="'Merchant'" :value="data.detail_so.sales_order.merchant_name ? detail_so.sales_order.merchant_name : '-'"/>
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24 mb10">
                            <v-row class="-mb1">
                                <v-col>
                                    <div class="text-black60">Phone Number</div>
                                </v-col>
                                <v-col>
                                    <div class="d-flex justify-end">
                                        <a 
                                            v-bind:href="'https://wa.me/62?text=EdenFarm%0A%0AHai%2C%20kurir%20anda%20sedang%20dalam%20perjalanan%20untuk%20mengantar%20pesanan%20anda.%20Mohon%20ditunggu%20ya'"
                                            target="_blank"
                                        >
                                            +62{{data.detail_so.sales_order.phone_number ? data.detail_so.sales_order.phone_number : '-'}}
                                        </a>
                                        <v-img 
                                            src="/img/whatsapp-icon.svg"
                                            max-height="25"
                                            max-width="25"
                                            class="ml10"
                                        ></v-img>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-divider/>
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Delivery Date'" :value="formatDate(data.detail_so.sales_order.delivery_date)" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'WRT'" :value="data.detail_so.sales_order.wrt_name" />
                        </v-col>
                        <v-col class="-mt24">
                            <DetailRowNew :name="'Shipping Address'" :value="data.detail_so.sales_order.shipping_address + ', ' + data.detail_so.sales_order.sub_district_detail + ', ' + data.detail_so.sales_order.postal_code" :align="true" />
                        </v-col>
                    </v-row>
                    <div class="left fs20 bold mt24 mb48">
                        <span>Receiver</span>
                    </div>
                    <v-row>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="`Recipient's Name`" :value="data.detail_so.recipient_name ? data.detail_so.recipient_name : '-'" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Payment Type'" :value="data.detail_so.sales_order.payment_type_name ? data.detail_so.sales_order.payment_type_name : '-'" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Money Received'" :value="data.detail_so.money_received ? 'Rp. ' + formatPrice(data.detail_so.money_received) : '-'" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Total Invoice'" :value="data.detail_so.sales_order.sales_invoice_total_charge ? 'Rp. ' + formatPrice(data.detail_so.sales_order.sales_invoice_total_charge) : '-'" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Start Time'" :value="data.detail_so.start_time == '0001-01-01T00:00:00Z' ? '-' : formatTime(data.detail_so.start_time)" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Arrival Time'" :value="data.detail_so.arrival_time == '0001-01-01T00:00:00Z' ? '-' : formatTime(data.detail_so.arrival_time)" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Finish Time'" :value="data.detail_so.finish_time == '0001-01-01T00:00:00Z' ? '-' : formatTime(data.detail_so.finish_time)" />
                        </v-col>
                        <v-col cols="12" md="4" class="-mt24">
                            <DetailRowNew :name="'Delivery'" :value="data.detail_so.unpunctual_detail == 0 ? '-' : data.detail_so.unpunctual_detail == 1 ? 'EARLY' : 'LATE'" />
                        </v-col>
                        <v-col cols="12" class="-mt24">
                            <DetailRowNew :name="'Reason Late/Early'" :value="data.detail_so.unpunctual_reason_value == '' ? '-' : data.detail_so.unpunctual_reason_value" />
                        </v-col>
                        <v-col cols="12" class="-mt24">
                            <DetailRowNew :name="'Reason Inaccurate Location'" :value="data.detail_so.far_delivery_reason == '' ? '-' : data.detail_so.far_delivery_reason" />
                        </v-col>
                        <v-col cols="12" class="-mt24">
                            <span class="text-black60">Photo:</span>
                            <v-row>
                                <v-col cols="3">
                                    <v-row>
                                        <v-col>
                                            <DisplayPhotoOverlay
                                                v-if="data.detail_so.delivery_evidence_image_url"
                                                :title="'Delivery Image'"
                                                :src="data.detail_so.delivery_evidence_image_url"
                                            />
                                        </v-col>
                                        <v-col>
                                            <DisplayPhotoOverlay
                                                v-if="data.detail_so.transaction_evidence_image_url"
                                                :title="'Transaction Image'"
                                                :src="data.detail_so.transaction_evidence_image_url"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <DetailRowNew :name="'Delivery Note'" :value="data.detail_so.note ? data.detail_so.note : '-'" :align="true" />
                        </v-col>
                    </v-row>
                    <div class="mt30" v-if="data.detail_so.postpone_delivery_log">
                        <div class="box-header-table">
                            Postponed History
                        </div>
                        <div class="box-body-table">
                            <v-data-table
                                :mobile-breakpoint="0"
                                :headers="control_tower_detail.table_headers.table_postpone"
                                :items="data.postponed_delivery"
                            >
                                <template v-slot:item="props">
                                    <tr style="height: 48px">
                                        <td>{{ props.index + 1 }}</td>
                                        <td>{{ props.item.postpone_reason }}</td>
                                        <td>{{ props.item.started_at == '0001-01-01T00:00:00Z' ? '-' : formatTime(props.item.started_at) }}</td>
                                        <td>{{ props.item.postponed_at == '0001-01-01T00:00:00Z' ? '-' : formatTime(props.item.postponed_at) }}</td>
                                        <td>
                                            <DisplayPhotoOverlay
                                                v-if="props.item.postpone_evidence"
                                                :title="'Postponed Image'"
                                                :src="props.item.postpone_evidence"
                                                class="rounded-form-sm"
                                            />
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </div>
                    </div>
                    <div v-if="data.detail_so.delivery_run_return">
                        <div class="box-header-table">
                            Products
                        </div>
                        <div class="box-body-table">
                            <v-data-table
                                :mobile-breakpoint="0"
                                :headers="control_tower_detail.table_headers.table_return"
                                :items="data.delivery_return.delivery_run_return_item"
                            >
                                <template v-slot:item="props">
                                    <tr style="height: 48px">
                                        <td>{{ props.index + 1 }}</td>
                                        <td>{{ props.item.product_name }}</td>
                                        <td>{{ props.item.uom_name }}</td>
                                        <td>{{ props.item.delivery_qty }}</td>
                                        <td>{{ props.item.receive_qty }}</td>
                                        <td>{{ formatPrice(props.item.subtotal) }}</td>
                                        <td>{{ props.item.return_reason_value }}</td>
                                        <td>
                                            <DisplayPhotoOverlay
                                                v-if="props.item.return_evidence"
                                                :title="'Return Waste Image'"
                                                :src="props.item.return_evidence"
                                                class="rounded-form-sm"
                                            />
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </div>
                        <div class="box-end">
                            <v-row>
                                <v-col cols="12" md="6" class="text-black60 -mt35">
                                    <div class="row">
                                        <div class="col">Total (Rp)</div>
                                        <div class="col d-flex justify-end text-black">
                                            {{ formatPrice(data.delivery_return.total_price) }}
                                        </div>
                                    </div>
                                    <div class="-mt10">
                                        <div class="row">
                                            <div class="col">Delivery Fee (Rp)</div>
                                            <div class="col d-flex justify-end text-black">
                                                {{ data.detail_so.sales_order.delivery_fee ? formatPrice(data.detail_so.sales_order.delivery_fee) : '-' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="-mt10">
                                        <div class="row">
                                            <div class="col">Discount (Rp)</div>
                                            <div class="col d-flex justify-end text-black">
                                                - {{ data.detail_so.sales_order.vou_disc_amount ? formatPrice(data.detail_so.sales_order.vou_disc_amount) : '' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="-mt10">
                                        <div class="row">
                                            <div class="col">Edenpoint</div>
                                            <div class="col d-flex justify-end text-black">
                                                - {{ data.detail_so.sales_order.point_redeem_amount ? formatPrice(data.detail_so.sales_order.point_redeem_amount) : '' }}
                                            </div>
                                        </div>
                                    </div>
                                    <v-divider class="my-4" />
                                    <div class="row fs20 text-black bold -mt10 mb2">
                                        <div class="col">Grand Total (Rp):</div>
                                        <div class="col d-flex justify-end">
                                            {{ formatPrice(data.delivery_return.total_charge) }}
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import waIcon from "../../assets/img/whatsapp-icon.svg";
    import emergencyIcon from "../../assets/img/emergency.png";

    export default { 
        data() {
            return {
                waIcon,
                emergencyIcon,
            }
        },
        mounted() {
            this.fetchcontrol_tower_detail({id: this.$route.params.id})
            this.fetchCourierDetail({id: this.$route.params.id})
        },
        computed: {
            ...mapState({
                control_tower_detail: state => state.controlTower.detail_control_tower,
                data: state => state.controlTower.detail_control_tower.data,
                filter: state => state.controlTower.detail_control_tower.filter,
                map_options: state => state.controlTower.detail_control_tower.map_options,
            }),
        },
        methods: {
            ...mapActions([
                'fetchcontrol_tower_detail',
                'fetchCourierDetail'
            ]),
            defaultData() { // default get data for DRS
                this.data.data_drs.delivery_run_sheet_item.slice(0, this.filter.show_counted)
            },
            checkPage() { // check page for next/prev page
                if (this.filter.show_counted * this.filter.current_page >= this.data.data_drs.delivery_run_sheet_item.length && this.data.data_drs.delivery_run_sheet_item.length !== 1) {
                    this.filter.disabledNext = true
                    this.filter.disabledPrev = false
                } else if (this.filter.current_page <= 1 && this.data.data_drs.delivery_run_sheet_item.length !== 1) {
                    this.filter.disabledNext = false
                    this.filter.disabledPrev = true
                } else if (this.filter.current_page <= 1 && this.data.data_drs.delivery_run_sheet_item.length === 1) {
                    this.filter.disabledNext = true
                    this.filter.disabledPrev = true
                } else {
                    this.filter.disabledNext = false
                    this.filter.disabledPrev = false
                }
            },
            nextPage() { // next page
                this.data.detail_so = this.data.data_drs.delivery_run_sheet_item.slice(this.filter.show_counted * this.filter.current_page, this.filter.show_counted * this.filter.current_page + this.filter.show_counted)[0]
                this.data.delivery_return = this.data.data_drs.delivery_run_sheet_item.slice(this.filter.show_counted * this.filter.current_page, this.filter.show_counted * this.filter.current_page + this.filter.show_counted)[0].delivery_run_return
                this.data.postponed_delivery = this.data.data_drs.delivery_run_sheet_item.slice(this.filter.show_counted * this.filter.current_page, this.filter.show_counted * this.filter.current_page + this.filter.show_counted)[0].postpone_delivery_log
                this.filter.current_page++
                this.checkPage()
            },
            prevPage() { // prev page
                this.filter.current_page--
                this.data.postponed_delivery = this.data.data_drs.delivery_run_sheet_item.slice(this.filter.show_counted * this.filter.current_page - this.filter.show_counted, this.filter.show_counted * this.filter.current_page)[0].postpone_delivery_log
                this.data.delivery_return = this.data.data_drs.delivery_run_sheet_item.slice(this.filter.show_counted * this.filter.current_page - this.filter.show_counted, this.filter.show_counted * this.filter.current_page)[0].delivery_run_return
                this.data.detail_so = this.data.data_drs.delivery_run_sheet_item.slice(this.filter.show_counted * this.filter.current_page - this.filter.show_counted, this.filter.show_counted * this.filter.current_page)[0]
                this.checkPage()
            }
        },
    }
</script>