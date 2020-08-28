<template>
  <canvas id="myChart" width="400" height="300" style="max-width:400px; margin:auto"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  props:['data'],
  methods: {
    createChart(chartId) {
      var vm=this;
      Chart.defaults.mydoughnut = Chart.defaults.doughnut;
      var custom=Chart.controllers.doughnut.extend({
        draw: function() {
            Chart.controllers.doughnut.prototype.draw.apply(this, arguments);
            var width = this.chart.width,
                height = this.chart.height;
            var fontSize = (height / 200).toFixed(2);
            this.chart.ctx.font = fontSize + "em Verdana";
            this.chart.ctx.textBaseline = "bottom";     
            var text = vm.data.datasets[0].data[0]+'%';
            var textY = (height / 2) / 0.70 ;
            if(vm.data.datasets[0].data[0]==null){
              text='_%';
            }
            var textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2);
            this.chart.ctx.fillStyle = '#007bff';                
            // this.chart.ctx.fillText(text, textX, textY);
            
            this.chart.ctx.font = fontSize - 0.3 + "em Verdana";
            text = '지난주'+vm.data.datasets[1].data[0]+'%';
            textY = (height / 2) / 0.6 ;
            if(vm.data.datasets[1].data[0]==null){
              text='_%';
            }
            textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2);
            this.chart.ctx.fillStyle = '#17a2b8';
            // this.chart.ctx.fillText(text, textX, textY);
        }
      });
      Chart.controllers.mydoughnut = custom;
      var ctx = document.getElementById(chartId);
      var myChart = new Chart(ctx, {
        type: 'mydoughnut',
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
  mounted () {
    this.createChart('myChart');
  },
  watch: {
    data(){ 
        this.createChart('myChart');
    }
  }
}
</script>

<style>

</style>