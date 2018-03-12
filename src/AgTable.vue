<template>
    <div style="width: 100%; height: 100%">
        <ag-grid-vue style="width: 100%; height: 100%;" :class="classProp"
                     :gridOptions="gridOptions">
        </ag-grid-vue>
    </div>
</template>

<script>

import {AgGridVue} from "ag-grid-vue";
// import "../../../node_modules/ag-grid/dist/styles/ag-grid.css";
// import "../../../node_modules/ag-grid/dist/styles/theme-material.css";

export default {
    props: {
        gridOptions: {
            required: true
        },
        classProp: {
            default: 'ag-material ag-theme-material'
        }
    },
    data() {
        return {

        }
    },
    components: {
        'ag-grid-vue': AgGridVue,
    },
    mounted(){

    }
}
</script>

<style>
.ag-row-editing {
    background-color: #b3d4fc !important;
    color: black !important;
    font-weight: bold !important;
}
</style>
