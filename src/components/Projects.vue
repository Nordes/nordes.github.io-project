<template>
  <div class="container">
    <div class="row pt-2">
      <div class="col col-lg-12 text-center" style="margin-top:20px;">
        <hex-row :items="projects.slice(0,3)" />
      </div>
    </div>
    <div class="row">
      <!-- Push left -->
      <div class="col col-lg-12 text-center" > <!--style="margin-top:-60px;" + left 160-->
        <hex-row :items="projects.slice(3,5)" :alternate="false" revert />
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-12 text-center">
        <hex-row :items="projects.slice(5,8)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  components: {
    'hex': () => import('@/components/ui.tools/Hex'),
    'hex-row': () => import('@/components/ui.tools/HexRow')
  },
  data () {
    return {
      projects: [
        {
          title: 'Nordes IdentityServer Ldap',
          description: 'Ldap plugin for IdentityServer (Not published)',
          link: null
        },
        {
          title: 'NewRelic AzureStorageQueueSize Plugin',
          description: 'Push the Azure Storage Queue Size towards NewRelic in order to have stats',
          link: 'https://github.com/Nordes/NewRelic.AzureStorageQueueSize.Plugin'
        },
        {
          title: 'websocket experiments / socket.io',
          description: 'Socket.IO does not pass through corporate proxy, so to connect to a Socket.IO server I build that client',
          link: 'https://github.com/Nordes/websocket.experiments.to.socket.io'
        },
        {
          title: 'To come...',
          description: '',
          link: null
        },
        {
          title: 'To come...',
          description: '',
          link: null
        },
        {
          title: 'To come...',
          description: '',
          link: null
        },
        {
          title: 'To come...',
          description: '',
          link: null
        },
        {
          title: 'To come...',
          description: '',
          link: null
        },
        {
          title: 'To come...',
          description: '',
          link: null
        }
      ]
    }
  }
}
</script>
