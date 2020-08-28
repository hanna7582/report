<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/" @click.prevent="menuActive('/');">AI 생활기록부</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>           
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <Search />  
          </b-nav-form>
          <b-nav-item></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>    
</template>

<script>
import Search from './Search'

export default {
  components:{ Search },
  methods: {
    menuActive(item) {
      this.active=item;
      if(this.$route.path==item){
        return
      }            
      this.$router.push(item);
    }
  },  
}
</script>

<style scoped>
  .btn-close{
    position: absolute;
    right: 80px;
    background: none;
    border: none;
    color:#fff;
    font-size: 2em;
  }
</style>