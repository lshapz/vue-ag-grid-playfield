import Vue from 'vue'
import App from './App.vue'
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-fresh.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "ag-grid/main";
import "ag-grid-enterprise/main";
import {LicenseManager} from "ag-grid-enterprise/main";
window.Vue = require('vue')

LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_2_May_2018__MTUyNTIxNTYwMDAwMA==d28c879e6375efc8359d943382f12d02");

new Vue({
  el: '#app',
  render: h => h(App)
})
