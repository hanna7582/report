<script>
  import {HorizontalBar} from 'vue-chartjs'
//Exporting this so it can be used in other components
  export default {
    extends: HorizontalBar,
    props:['data','options'],
    mounted() {
     this.addPlugin({
        beforeInit: function (chart) {
          // console.log('init',chart);          
          chart.options.animation={
            duration: 500,
            easing: "easeOutQuart",
            onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                            scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                        ctx.fillStyle = '#fff';                        
                        if(dataset.data[i]!=0){
                          ctx.fillText(dataset.data[i], model.x-5, model.y);
                        }    
                    }
                });               
            }
          }
        }
      })
      this.renderHorizontalBarChart();  
    },
    computed: {
      chartData: function() {       
        return this.data;
      }
    },
    methods: {
      renderHorizontalBarChart: function() {
        this.renderChart(
          //data
          {
            labels: this.data.labels,
            datasets: this.data.datasets            
          },
          //option
          {   
            tooltips:{
              enabled:false,              
            },
            scales: {                
              xAxes: [ {
                  stacked: true,
                  ticks: {
                    display: false,
                  },
                  gridLines: {
                     display: true,
                    zeroLineWidth:2, 
                    zeroLineColor:'#6c757d',                                           
                    drawTicks:false,  
                    lineWidth:0,
                    z:1  
                  },
              }],
              yAxes: [{
                  stacked: true,                  
                  gridLines: {
                      display: false,                      
                  },
              }],
            },
            legend: {
                display: false,                
            },
            responsive: true,
            maintainAspectRatio: false,
          });      
      }
    },
    watch: {
      data: function() {      
        this.renderHorizontalBarChart();
      }
    }
  }
</script>
