<template>
<div id="app">
   
  <button @click="clicker">Show/Hide Grid</button>
  <div v-if="showGrid">
    <grid-man></grid-man>
  </div>

</div>
</template>

<script>
import EnterpriseBlotterTest from "./EnterpriseBlotterTest.vue"

  export default {
  name: 'app',
  components: {
    'grid-man': EnterpriseBlotterTest
  },
  data: function() {
    return {
      msg: "Howdy",
      showGrid: true
    }
  },
  methods: {
    clicker: function(){
      this.showGrid = !this.showGrid
    }
  }
}


</script>


<style>



</style>
 