<template>
    <div style="width: 100%;">
        <h1>Large Data Set Component (50,000 rows)</h1>
        <ag-grid-vue style="width: 100%; height: 600px;" class="ag-fresh"
                     :gridOptions="gridOptions">
        </ag-grid-vue>
    </div>
</template>

<script>

import Vue from "vue";
import {AgGridVue} from "ag-grid-vue";
import {randomizeDataMixin} from './mixins.js'
var oneTestRow = [{"account":"NOTANACCOUNT","trader":"Trader3","strategy":"Strategy3","counterparty":"Counterparty2","cid":"701829","ticker":"NYSE:CMG","ric":"SEE","bbg":"XEE","type":"MARKET","orderId":"0","quantity":"272","price":"360.6745928","filled":"0","open":"272","limitPrice":"0","filledPrice":"0","venue":"VEE","gateway":"EBSD_GWY","currency":"USD","side":"BUY","originalOrderId":"114514","rejected":"FALSE","rejectedReason":"","state":"INIT","entryMethod":"PROGRAMMATIC_EMS_API","transactTime":"2016-08-09T17:35:42.777Z","placementTime":"2016-08-09T17:35:42.777Z","emsTime":"2016-08-09T17:35:42.778Z"}]

export default {
    mixins: [randomizeDataMixin], 
    data() {
        return {
            columnDefs: [ { headerName: 'Account', field: 'account' },
                          { headerName: 'Trader', field: 'trader' },
                          { headerName: 'Strategy', field: 'strategy' },
                          { headerName: 'Counterparty', field: 'counterparty' },
                          { headerName: 'CID', field: 'cid' },
                          { headerName: 'Ticker', field: 'ticker' },
                          { headerName: 'RIC', field: 'ric' },
                          { headerName: 'BBG', field: 'bbg' },
                          { headerName: 'Type', field: 'type' },
                          { headerName: 'Order ID', field: 'orderId' },
                          { headerName: 'Quantity', field: 'quantity' },
                          { headerName: 'Price', field: 'price' },
                          { headerName: 'Filled', field: 'filled' },
                          { headerName: 'Open', field: 'open' },
                          { headerName: 'Limit Price', field: 'limitPrice' },
                          { headerName: 'Filled Price', field: 'filledPrice' },
                          { headerName: 'Venue', field: 'venue' },
                          { headerName: 'Gateway', field: 'gateway' },
                          { headerName: 'Currency', field: 'currency' },
                          { headerName: 'Side', field: 'side' },
                          { headerName: 'Original Order ID', field: 'originalOrderId' },
                          { headerName: 'Rejected', field: 'rejected' },
                          { headerName: 'Rejected Reason', field: 'rejectedReason' },
                          { headerName: 'State', field: 'state' },
                          { headerName: 'Entry Method', field: 'entryMethod' },
                          { headerName: 'Transact Time', field: 'transactTime' },
                          { headerName: 'Placement Time', field: 'placementTime' },
                          { headerName: 'Ems Time', field: 'emsTime' } 
                        ],
            rowData: oneTestRow.concat(this.mock100000()),
        }
    },
    computed: {
        gridOptions: function () {
            let gridOptions = {};
            gridOptions.rowData = this.rowData;
            gridOptions.columnDefs = this.columnDefs;
            gridOptions.enableFilter = true;
            gridOptions.enableSorting = true;
            gridOptions.singleClickEdit = true;
            gridOptions.showToolPanel = true;
            gridOptions.suppressScrollOnNewData = true;
            gridOptions.pagination = true;
            gridOptions.rowBuffer = 100;
            gridOptions.debug = true;
            gridOptions.onCellClicked = this.onClicked;
            // gridOptions.defaultColDef = {
            //     menuTabs: ['filterMenuTab']
            // }
            return gridOptions
        },
        // rowDataReal: {
        //     get: function(){
        //         return this.rowData
        //     },
        //     set: function(){
        //         let returnValue
        //         let localThis = this
        //         setInterval(function(){
        //     // localThis.$set(localThis.rowData, localThis.mock10000())
        //             localThis.rowData = localThis.mock100000()
        //         }, 10000)
        //     }
        // 
        // }
    },
    components: {
        'ag-grid-vue': AgGridVue,
    },
    created() {                  
        let localThis = this
        // setInterval(function(){
        //     // localThis.$set(localThis.rowData, localThis.mock10000())
        //     localThis.rowData = localThis.mock100000()
        // }, 10000)
    },
    methods: {

        onClicked: function() {
            console.log(this)
            // this.gridOptions.api.getFilterInstance("name").getFrameworkComponentInstance().componentMethod("Hello World!");
        }

    }
}
</script>

<style>
</style>