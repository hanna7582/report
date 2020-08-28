<template>
  <div id="app">
      <Header />
      <div class="container-fluid">
        <b-row class="mt-3">
          <b-col col lg="2">
            <SideNav />
          </b-col>
          <b-col col lg="10">           
            <router-view class="contents"/>  
          </b-col>        
        </b-row>
      </div>
  </div>
</template>

<script>
import Header from './components/Header'
import SideNav from './components/SideNav'

export default {
  components:{ Header, SideNav }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* min-width: 1280px;
  margin: auto; */
  background: #f1fcff;  
}
.contents{
  animation: cloak-in 1s;
}
.contents[v-cloak]{
    opacity: 0;
}
@keyframes cloak-in {
    0%{opacity: 0;}
}
</style>
