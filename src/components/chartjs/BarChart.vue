<script>
  //update https://stackoverflow.com/questions/43728332/vue-chart-js-chart-is-not-updating-when-data-is-changing
  
  import {Bar} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default {
    extends: Bar,
    props:['data','options'],
    mounted() {
      this.addPlugin({        
        beforeInit : function (chart) {
          chart.options.animation={
            duration: 500,
            easing: "easeOutQuart",
            onComplete: function () {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                            scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
                        ctx.fillStyle = '#fff';
                        var y_pos = model.y + 15;
                        if ((scale_max - model.y) / scale_max >= 0.93)
                            y_pos = model.y + 20; 
                        if(dataset.data[i]!=0){
                          ctx.fillText(dataset.data[i], model.x, y_pos);
                        }    
                    }
                });               
            }
          }
        }
      })
      this.renderBarChart();    
    },
    computed: {
      chartData: function() {       
        return this.data;
      }
    },
    methods: {
      renderBarChart: function() {
        this.renderChart(
          //data
          {
            labels: this.data.labels,
            datasets: this.data.datasets
          },
          //option
          {   
            tooltips:{
              enabled:true,
              mode: 'index',
              // axis: 'y'
            },
            scales: {                
              xAxes: [ {
                  stacked: true,
                  gridLines: {
                      display: false
                  },
              }],
              yAxes: [{
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
            },
            legend: {
                display: true,
                position:'top',
                align:'end'
            },
            responsive: true,
            maintainAspectRatio: false,
          });      
      }
    },
    watch: {
      data: function() {  
        console.log('bar 차트실행');
        this.renderBarChart();
      }
    }
  }
</script>
