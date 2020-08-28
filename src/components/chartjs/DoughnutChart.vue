<template>
  <div class="chart">
    <canvas id="wkChart" width="400" height="300" style="max-width:400px; margin:auto"></canvas>
    <div class="count">
        <strong>{{ aniWk }}%</strong>
        <span>지난주 {{aniPastWk}}%</span>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props:['data'],
  methods: {
    createChart() {
      var ctx = document.getElementById('wkChart');
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data:{
          labels: this.data.labels,
          datasets: this.data.datasets
        },
        options: {
          legend: {
              display: false,                
          },
          responsive: true,
          circumference:Math.PI,
          rotation : -Math.PI,  
        }
      });
    }
  },
  data() {
    return {
      twWkExRt: 0,
      twPastWkExRt: 0
    }
  },
  computed: {
    aniWk(){
        return this.twWkExRt.toFixed(0);
    },
    aniPastWk(){
        return this.twPastWkExRt.toFixed(0);
    }
  },
  mounted () {
    this.createChart();
  },
  watch: {
    data(){ 
      this.createChart();
      TweenLite.to(this.$data, 1, { twWkExRt:this.data.datasets[0].data[0] });
      TweenLite.to(this.$data, 1, { twPastWkExRt:this.data.datasets[1].data[0] });
    },
  }
}
</script>

<style>
  .chart .count{
      position: absolute;
      left:50%;
      top:70%;
      transform: translateX(-50%);
      max-width: 200px;
      margin: auto;
  }
  .chart .count strong{
      display: block;
      font-size: 1.5em;
      color:#007bff;
  }
  .chart .count span{
      color:#17a2b8;
  }
</style>