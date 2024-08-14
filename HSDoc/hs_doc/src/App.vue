<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import autofit from 'autofit.js'
export default {
  mounted() {
    autofit.init({
      dh: 1080,
      dw: 1920,
      el: '#app',
      resize: true
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
