<template>
  <Header />
  
  <main>
    <router-view />

    <Loading v-if="isLoading === true" />
  </main>
</template>

<script>
import Header from "./components/SearchHeader.vue";
import Loading from "./components/isLoading.vue";
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    Header,
    Loading,
  },
  computed: {
    ...mapState('Movie',['isLoading']),
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  letter-spacing: -0.05em;
}

html {
  font-size: 10px;
}

input,button{
  box-sizing: border-box;
  border: 0;
  font-family: 'Libre Franklin', sans-serif;
}

button {
  cursor: pointer;
}

img {
  width: 100%;
}

a {
  color: #000;
}

#app {
  font-family: 'Manrope', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #696969;
}

section {
  background: #111;
}

main {
  overflow: hidden;
}

.section-inner {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 20px;
}

</style>
