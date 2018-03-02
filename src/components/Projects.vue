<template>
  <div class="container">
    <div class="row">
      <h3>Preface</h3>
    </div>
    <div class="row">
      <p>As you know, while working in a company I most likely work only for the company and building projects out of it is quite difficult. However, I try to contribute to other projects when I can and also try to do small PoC that I don't always keep on Github.</p>
    </div>
    <div class="row">
      <h3>Projects</h3>
    </div>
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
          title: 'IdentityServer4.LdapExtension',
          description: 'Ldap plugin for IdentityServer 4',
          link: 'https://github.com/Nordes/IdentityServer4.LdapExtension'
        },
        {
          title: 'OIDC-JWKs-Verify',
          description: `Node access token (OpenID) validation library. 
                        This have been tested with IdentityServer<br>
                        <img src="https://coveralls.io/repos/github/Nordes/oidc-jwks-verify/badge.svg?branch=master">
                        <a href="https://badge.fury.io/js/oidc-jwks-verify"><img src="https://badge.fury.io/js/oidc-jwks-verify.svg"></a>`,
          link: 'https://github.com/Nordes/oidc-jwks-verify'
        },
        {
          title: 'NewRelic AzureStorageQueueSize Plugin',
          description: `Push the Azure Storage Queue Size towards NewRelic in order to have stats.<br>
                        <a href="https://ci.appveyor.com/project/Nordes/newrelic-azurestoragequeue-agent"><img src="https://ci.appveyor.com/api/projects/status/cvbh3t0775gb6rj8?svg=true"></a>`,
          link: 'https://github.com/Nordes/NewRelic.AzureStorageQueueSize.Plugin'
        },
        {
          title: 'websocket experiments / socket.io',
          description: 'Socket.IO does not pass through corporate proxy, so to connect to a Socket.IO server I build that client',
          link: 'https://github.com/Nordes/websocket.experiments.to.socket.io'
        },
        {
          title: 'To come... bot... framework ;)',
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
