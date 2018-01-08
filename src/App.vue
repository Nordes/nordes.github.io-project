<template>
 <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/"><img src="./assets/logo.svg" style="height:60px" /></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li :class="activeLinkClass('Projects')">
            <router-link class="nav-link" to="/">Projects</router-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Projects I find interesting</a>
          </li> -->
          <li :class="activeLinkClass('Resume')">
            <router-link class="nav-link" to="/Resume">Resume (CV)</router-link>
          </li>
          <li :class="activeLinkClass('ReachMe')">
            <router-link class="nav-link" to="/ReachMe">How to reach me</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    activeLinkClass (current) {
      if (this.$route.name === current) {
        return 'nav-item active'
      }

      return 'nav-item'
    }
  }
}
</script>
<style src="../src/assets/css/hex.css"></style>
<style lang="scss">
  @import "./assets/scss/bootstrap_custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
