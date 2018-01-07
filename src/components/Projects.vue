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
          name: 'Nordes.IdentityServer.Ldap',
          description: 'Ldap plugin for IdentityServer (Not published)',
          link: null
        },
        {
          name: 'NewRelic.AzureStorageQueueSize.Plugin',
          description: 'Push the Azure Storage Queue Size towards NewRelic in order to have stats',
          link: ''
        },
        {
          name: 'websocket.experiments.to.socket.io',
          description: 'Socket.IO does not pass through proxy, so to connect to a Socket.IO server I build that client',
          link: ''
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
