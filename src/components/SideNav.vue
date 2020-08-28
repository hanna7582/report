<template>
  <div class="sidenav">
    <b-button 
      block
      v-for="(item, index) in menu" 
      :key="index"
      :variant="isMenuActive(item)" 
      @click="menuActive(item)">
      {{item | filterMenu }}
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '/weekly',
      menu:[
        '/weekly',
        '/monthly',
        '/eval',
        '/campaign'
      ]
    }
  },
  filters:{
      filterMenu(item){
        return item.replace(/\//g,'').toUpperCase();
      }
  },
  methods: {
    menuActive(item) {
      this.active=item;
      if(this.$route.path==item){
        return
      }            
      this.$router.push(item);
    },
    isMenuActive(item){
      return item==this.active?'info':'';
    }
  },
}
</script>

<style scoped>
  @media (max-width: 991px){
    .sidenav {
      margin-bottom:20px;
    }
    .sidenav  button{
      margin: 0 0 5px;
    } 
  }
</style>