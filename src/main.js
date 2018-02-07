import Vue from 'vue'
import App from './App.vue'
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-fresh.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.css";

new Vue({
  el: '#app',
  render: h => h(App)
})
