<template>
  <div class="container">
    Tech / Job
    <div class="row py-2 px-5">
      <div style="margin-top:40px;">
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      </div>
      <div style="margin-top:-60px; margin-left: 160px"> <!--160-->
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      </div>
      <div style="margin-top:-60px;">
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resume',
  data () {
    return {
      msg: `Resume.`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
