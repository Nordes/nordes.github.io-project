<template>
  <div class="container">
    <div class="row py-2 px-5">
      <div style="margin-top:40px;">
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      </div>
      <div style="margin-top:-60px; margin-left: 160px"> <!--160-->
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      </div>
      <div style="margin-top:-60px;">
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexagon" style="float:left; margin-left: 25px;"><span></span></div>
      <div class="hexAlt" style="float:left; margin-left: 25px;"><span></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  data () {
    return {
      projects: [
        {
          name: 'NewRelic.AzureStorageQueueSize.Plugin'
        },
        {
          name: 'websocket.experiments.to.socket.io'
        }
      ],
      msg: `There's always a beginning to everything ;).`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
