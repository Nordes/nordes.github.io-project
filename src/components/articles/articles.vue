<template>
  <div class="container mt-3">
    <div class="row text-white" style="height:240px; background-image: url(./static/images/articles_top.jpg); background-repeat: no-repeat;">
      <div class="col-12 pt-3 text-center">
        <h1>Articles</h1>
      </div>
    </div>
    <div class="row">
      <router-link class="nav-link" to="/Articles/howto-openldap-with-contoso-users">[Part I of V] How to create your own Ldap (OpenLdap) with Contoso users</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Articles',
  data () {
    return {
      items: [
        {
          title: 'test',
          path: 'test',
          description: 'something'
        }
      ]
    }
  }
}
</script>
