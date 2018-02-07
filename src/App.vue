<template>
<div id="app">
   
  <button @click="clicker">Click Me</button>
  <div v-if="showGrid">
    <grid-man></grid-man>
  </div>

</div>
</template>

<script>
import GridMan from "./GridMan.vue"

  export default {
  name: 'app',
  components: {
    'grid-man': GridMan
  },
  data: function() {
    return {
      msg: "Howdy",
      showGrid: false
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
 