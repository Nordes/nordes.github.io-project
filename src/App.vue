<template>
 <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/"><img src="./assets/logo.svg" style="height:60px" /></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li :class="'nav-item' + activeLinkClass('Projects')">
            <router-link class="nav-link" to="/">Projects</router-link>
          </li>
          <li :class="'nav-item' + activeLinkClass('Tech')">
            <router-link class="nav-link" to="/Tech">Tech</router-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Projects I find interesting</a>
          </li> -->
          <li :class="'nav-item' + activeLinkClass('Resume')">
            <router-link class="nav-link" to="/Resume">Resume (CV)</router-link>
          </li>
          <li :class="'nav-item' + activeLinkClass('ReachMe')">
            <router-link class="nav-link" to="/ReachMe">How to reach me</router-link>
          </li>
          <li :class="'nav-item' + activeLinkClass('Articles') + activeLinkClass('Article')">
            <router-link class="nav-link" to="/Articles">Articles</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <span>Copyright &copy;2018 by Nordès Ménard-Lamarre</span>
        </div>
      </div>
  </footer> 

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    activeLinkClass (current) {
      if (this.$route.name === current) {
        return ' active'
      }

      return ''
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

code {
  font-size: 80%;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background: linear-gradient(#ffffffff, #8C7B7B);
}
</style>
