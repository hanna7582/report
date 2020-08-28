<script>
  //update https://stackoverflow.com/questions/43728332/vue-chart-js-chart-is-not-updating-when-data-is-changing
  
  import {Doughnut} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Doughnut,
    props:['data','options'],
    mounted() {
      this.addPlugin({
        beforeInit: function (chart) {
          chart.options.animation={
            duration: 500,
            easing: "easeOutQuart",
            onComplete: function () {
              var ctx=this.chart.ctx;
              var width = chart.width,
              height = chart.height;          
              var fontSize = (width / 200).toFixed(2);                            
              ctx.font = fontSize + "em Verdana";
              // ctx.textAlign = 'center';
              ctx.textBaseline = "bottom";
              var text = this.data.datasets[0].data[0]+'%',
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  textY = height;
                  ctx.fillText(text, textX, textY-50);     

                  ctx.font = (fontSize-1) + "em Verdana"; 
                  text = '지난주'+this.data.datasets[1].data[0]+'%',
                  textX = Math.round((width - ctx.measureText(text).width) / 2),
                  ctx.fillText(text, textX, textY-20);                                
                //  console.log(width, height, text, textX, textY);            
            }
          }
        }
      })
      this.renderPieChart();    
    },
    computed: {
      chartData: function() {       
        return this.data;
      }
    },
    methods: {
      renderPieChart: function() {
        console.log('pie 차트실행');
        this.renderChart(
          //data
          {
            labels: this.data.labels,
            datasets: this.data.datasets
          },
          //option
          {   
             
            legend: {
                display: false,                
            },
            responsive: true,
            circumference:Math.PI,
            rotation : -Math.PI,            
          });      
      }
    },
    watch: {
      data: function() {    
        this.renderPieChart();
      }
    }
  }
</script>
