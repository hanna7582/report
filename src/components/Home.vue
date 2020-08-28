<template>
  <div>
    <h2>학습리포트 {{yymm | filterMonth }}</h2>        
    <div class="msg" v-html="homeSummary.msg"></div>    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {      
    }
  },
  created () {   
    this.todayWeekDatePicker();
    this.changeWeekDatePicker({change:'', targetDate:new Date()});
    this.getHomeSummary({
      studId:this.studuent.selected, 
      dt:this.yymmdd
    })
  },
  mounted () {
    
  },
  filters: {
    filterMonth: function(value) {
      return value.split('-')[1].replace(/0/g,'')+'월';
    }
  },
  computed: {
    ...mapState(['studuent','yymmdd','homeSummary','yymm', 'test']),
  },
  methods: {        
    ...mapMutations(['todayWeekDatePicker', 'changeWeekDatePicker']),    
    ...mapActions(['getHomeSummary']),  
  }
}
</script>

<style>

</style>