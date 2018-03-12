<template>
  <div class="wrapper-enterprise">
    <div class='enterprise-table'>
      <ag-table :gridOptions="gridOptions"></ag-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
//base Ag-Grid stuff
import AgTable from './AgTable.vue'
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-material.css";
// cell editor framework components - does not work as .vue single-file component
import NumericEditorComponent from './NumericEditorComponent.js'
import ValidationEditorComponent from './ValidationEditorComponent.js'

// server-side data functions (sort, filter)
import EnterpriseDataSource from './EnterpriseDataSource.js'
//mixins

export default {
  data: function() {
    return {
      perPage: this.initialPageSize,
      pageValues: [25, 50, 100, 250, 500, 1000],
      // search: '',
      columnDefs: [ { headerName: 'Account', field: 'account', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest, },
                    { headerName: 'Trader', field: 'trader', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest},
                    { headerName: 'Strategy', field: 'strategy', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Counterparty', field: 'counterparty', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'CID', field: 'cid', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent },
                    { headerName: 'Ticker', field: 'ticker', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'RIC', field: 'ric', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: ValidationEditorComponent },
                    { headerName: 'BBG', field: 'bbg', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: ValidationEditorComponent },
                    { headerName: 'Type', field: 'type', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true }, // dropdown
                    { headerName: 'Order ID', field: 'orderId', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent },
                    { headerName: 'Quantity', field: 'quantity', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent  },
                    { headerName: 'Price', field: 'price', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent },
                    { headerName: 'Filled', field: 'filled', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent },
                    { headerName: 'Open', field: 'open', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent },
                    { headerName: 'Limit Price', field: 'limitPrice', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent  },
                    { headerName: 'Filled Price', field: 'filledPrice', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditorFramework: NumericEditorComponent  },
                    { headerName: 'Venue', field: 'venue', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Gateway', field: 'gateway', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Currency', field: 'currency', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Side', field: 'side', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['BUY', 'SELL']}, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Original Order ID', field: 'originalOrderId', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: false },
                    { headerName: 'Rejected', field: 'rejected', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['FALSE', 'TRUE']}, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'Rejected Reason', field: 'rejectedReason', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, onCellValueChanged: this.submitChangeToRest },
                    { headerName: 'State', field: 'state', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['CANCELLED', 'FILLED', 'INIT', 'NEW', 'PART_FILLED', 'REJECTED']}, onCellValueChanged: this.submitChangeToRest},  // dropdown
                    { headerName: 'Entry Method', field: 'entryMethod', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, editable: true, cellEditor: 'agRichSelectCellEditor', cellEditorParams: {values: ['INTERACTIVE_CLIENT', 'PROGRAMATIC_EMS_API']}, onCellValueChanged: this.submitChangeToRest }, // dropdown
                    { headerName: 'Transact Time', field: 'transactTime', suppressFilter: true },
                    { headerName: 'Placement Time', field: 'placementTime', suppressFilter: true },
                    { headerName: 'Ems Time', field: 'emsTime', suppressFilter: true }
                  ],
        rowData: []
    }
  },
  components: {
    'ag-table': AgTable
  },
  computed: {
    gridOptions: function () {
        let gridOptions = {};
        // gridOptions.floatingFilter = true;
        gridOptions.debug = true;
        gridOptions.rowHeight = 48;
        gridOptions.columnDefs = this.columnDefs;
        gridOptions.enableFilter = true;
        gridOptions.enableSorting = true;
        gridOptions.singleClickEdit = true;
        // gridOptions.showToolPanel = true;
        gridOptions.suppressScrollOnNewData = true;
        gridOptions.scrollbarWidth = 30;
        // gridOptions.pagination = true;
        // gridOptions.rowModelType = 'enterprise';
        // gridOptions.editType = 'fullRow'; // cannot have both 'fullRow' and select based cell edits
        gridOptions.enableServerSideSorting = true;
        gridOptions.enableServerSideFilter = true;
        gridOptions.rowModelType = 'infinite';
        gridOptions.rowBuffer = 100;
        gridOptions.debug = true;
        gridOptions.deltaRowDataMode = true
        gridOptions.onCellClicked = this.onClicked;
        return gridOptions
    },
    initialPageSize: function(){
      if (this.gridOptions.api) {
        return this.gridOptions.api.paginationGetPageSize().toString()
      } else {
        return "100"
      }
    },
  },
  created() {

  },
  mounted(){
    let localThis = this
    axios.get('http://localhost:3000/data').then(item=>{
      localThis.createDataSource(item.data)
    })
  },
  methods: {
    createDataSource: function(data){
      let dataSource = new EnterpriseDataSource(data)
      this.gridOptions.api.setDatasource(dataSource)
    },
    submitChangeToRest: function(params){
        let data = {},
         colID = params.column.colId.toString(),
         rowID = params.node.id,
         config = {headers: {'Content-Type': 'application/json'}};
        data[colID] = params.newValue;
        axios.patch('http://localhost:3000/data/' + rowID, data, config)
    }

  },

}


</script>

<style lang="css">

  .wrapper-enterprise {
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    grid-template-areas: '. tb .';
  }

  .enterprise-table {
    height: 85vh;
    grid-area: tb;
  }
</style>
