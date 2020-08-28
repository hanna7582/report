<template>
    <div>   
        <b-input-group class="mx-auto" style="width: 300px; margin-bottom:20px;">        
            <b-input-group-prepend>
                <b-button variant="primary" @click="changeWeeklyData('prev')">이전</b-button>
            </b-input-group-prepend>
            <b-form-input :value="weeklyDateFormat" class="text-center" readonly></b-form-input>            
            <b-input-group-append>
                <b-button variant="primary" @click="changeWeeklyData('next')" :disabled="nextActive">다음</b-button>
            </b-input-group-append>
        </b-input-group>                    

        <div v-swiper:mySwiper="swiperOptions" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <b-badge pill variant="danger">총평</b-badge>
                    <div v-html="weeklySummary.msg1"></div>
                    <div v-if=" this.weeklySummary.wkExRt !== null && this.weeklySummary.pastWkExRt !== null">
                        <DoughnutChart                         
                            class="chart" 
                            :data="wkChartData"                             
                        ></DoughnutChart>
                        <!-- <div class="count">
                            <strong>{{ aniWk }}%</strong>
                            <span>지난주 {{aniPastWk}}%</span>
                        </div> -->
                    </div>
                </div>
                <div class="swiper-slide">
                    <b-badge pill variant="primary">칭찬</b-badge>
                    <div v-html="weeklySummary.msg2"></div>
                </div>
                <div class="swiper-slide">
                    <b-badge pill variant="success">처방</b-badge>
                    <div v-html="weeklySummary.msg3"></div>
                </div>                
            </div>
            <div class="swiper-pagination"></div>      
        </div>
       
        <b-list-group v-if="weeklyData" style="margin-bottom:20px;">
            <!-- <b-list-group-item class="d-flex justify-content-between align-items-center">
                주간 수행률
                <b-badge variant="info" pill>
                    {{weeklyData.wkExRt | nullCheck}}%
                    ({{weeklyData.totalLrnExCnt | nullCheck }}/{{weeklyData.planCnt | nullCheck}})
                </b-badge>
            </b-list-group-item> -->
            <b-list-group-item class="d-flex justify-content-between align-items-center">
                주간출석률
                <b-badge variant="info" pill>
                    {{weeklyData.wkAttRt | nullCheck}}%
                    ({{weeklyData.attDayCnt | nullCheck }}/{{weeklyData.planDayCnt | nullCheck}})
                </b-badge>
            </b-list-group-item>
            <!-- <b-list-group-item class="d-flex justify-content-between align-items-center">
                스스로학습
                <b-badge variant="info" pill>
                    {{weeklyData.aLrnExCnt | nullCheck}}개
                </b-badge>
            </b-list-group-item> -->
            
        </b-list-group>           
        <div v-else>            
            <b-icon icon="info-circle-fill" scale="2" variant="info"></b-icon>
            데이터가 없습니다.
        </div>

        <b-card 
            no-body 
            header-tag="header"
        >
            <template v-slot:header>
                <h6 class="mb-0">주간 수행률</h6>
                <div class="right-count">
                    {{weeklyData.wkExRt | nullCheck}}%
                    ({{weeklyData.totalLrnExCnt | nullCheck }}개 학습 계획 중 {{weeklyData.planCnt | nullCheck}}개 학습완료)
                </div>
            </template>
        
            <b-tabs card pills>
                <b-tab title="요일" active @click="tabMenu('day')">
                    <b-card-text>
                        <BarChart 
                            class="chart" 
                            v-if="tabMenuActive('day')" 
                            :height="250" 
                            :data="dayChartData" 
                            :options="dayChartOptions">
                        </BarChart>
                    </b-card-text>
                </b-tab>
                <b-tab title="과목" @click="tabMenu('subject')">
                    <b-card-text>
                        <HorizontalBarChart 
                            class="chart" 
                            v-if="tabMenuActive('subject')" 
                            :height="250" 
                            :data="subChartData" 
                            :options="subChartOptions">
                        </HorizontalBarChart>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import { log } from 'util';
import BarChart from '@/components/chartjs/BarChart'
import HorizontalBarChart from '@/components/chartjs/HorizontalBarChart'
import DoughnutChart from "@/components/chartjs/DoughnutChart";

export default {
    components:{
        BarChart,
        HorizontalBarChart,
        DoughnutChart
    },
    data() {
        return {
            nextActive:true,
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true,
                }
            },   
            tabMenuCurrent:'day',
            // twWkExRt: 0,
            // twPastWkExRt: 0,
        }
    },    
    computed: {       
        ...mapState([
            'studuent',
            'weeklySummary',
            'weeklyData',
            'weekDatePicker',
            'targetDate', 
            'todayWeeklyDate', 
            'todayWk',
            'yymm',
            'wk']),
        weeklyDateFormat(){ 
            var yymmArray=this.yymm.split('-');    
            return yymmArray[0]+'년'+yymmArray[1]+'월'+this.wk+'주차';
        },
        wkChartData(){
            return {
                labels: ['수행함','안함'],
                datasets:[
                    {
                        data: [this.weeklySummary.wkExRt, 100-this.weeklySummary.wkExRt],
                        backgroundColor:['#007bff','#e9ecef'],
                        label: 'Dataset 1',
                        weight:5

                    },
                    {
                        data: [this.weeklySummary.pastWkExRt, 100-this.weeklySummary.pastWkExRt],
                        backgroundColor:['#17a2b8','#e9ecef'],
                        label: 'Dataset 2',
                        weight:2
                    },
                ]  
            };
        },
        dayChartData(){            
            return {
                labels: ['월', '화','수','목','금','토','일'],
                datasets: [
                    {
                        label: ['학교공부'],
                        backgroundColor: '#17a2b8',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        barThickness: 20,
                        pointBorderColor: '#17a2b8',
                        data: this.weeklyData.dayCLrnExCntSp
                    },
                    {
                        label: ['특별학습'],
                        backgroundColor: '#007bff',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        barThickness: 20,
                        pointBorderColor: '#007bff',
                        data: this.weeklyData.dayNLrnExCntSp
                    }
                ]            
            };
        },
        subChartData(){
            return {
                // labels: ['국어', '수학','사회','과학','영어','통합','영어완성','수학완성','한자서당','기타 특별학습','글로벌리더십'],
                labels:this.weeklyData.subjSp,
                datasets: [
                    {
                        backgroundColor: ['#416ee1', '#e74747','#6bc230','#fb9813','#2cafb4','#757575','#5ba1bb','#6b5eb8','#b04ff5','#ec63bd','#b7b7b7','#b7b7b7'],
                        pointBackgroundColor: 'black',
                        barThickness: 15,
                        data: this.weeklyData.subjLrnExCntSp
                    }
                ]
            }
        },
        wkChartOptions(){
            return {}
        },
        dayChartOptions(){
            return {}
        },
        subChartOptions(){
            return {}
        },
        // aniWk(){
        //     return this.twWkExRt.toFixed(0);
        // },
        // aniPastWk(){
        //     return this.twPastWkExRt.toFixed(0);
        // }
    },
    created() {
        this.todayWeekDatePicker();
        this.changeWeeklyData();          
    },
    mounted () {       
            
    },
    filters: {
        nullCheck: function(value) {            
            return value || value === 0 ? value : '-';
        }
    },
    watch: {
        targetDate() {                 
           if(this.todayWeeklyDate == this.yymm && this.todayWk == this.wk){
                this.nextActive=true;
            }else{
                this.nextActive=false;
            }                          
            this.mySwiper.slideTo(0, 0, false)            
        },       
        // weeklySummary(oldValue, newValue){    
        //     TweenLite.to(this.$data, 1, { twWkExRt:this.weeklySummary.wkExRt });
        //     TweenLite.to(this.$data, 1, { twPastWkExRt:this.weeklySummary.pastWkExRt });
        // }
    },
    methods: {
        ...mapMutations(['changeWeekDatePicker', 'todayWeekDatePicker']),    
        ...mapActions(['getWeeklyData', 'getWeeklySummary']),    
        changeWeeklyData(change){                          
            this.changeWeekDatePicker({change, targetDate:this.targetDate});                       
            this.getWeeklyData({
                studId:this.studuent.selected, 
                yymm:this.yymm.replace('-',''), 
                wk:this.wk
            })  
            this.getWeeklySummary({
                studId:this.studuent.selected, 
                yymm:this.yymm.replace('-',''), 
                wk:this.wk
            })                           
        },
        tabMenu(menu){
            console.log(menu);
            this.tabMenuCurrent=menu;
        },
        tabMenuActive(menu){
            return this.tabMenuCurrent==menu?true:false;
        }
    }
}
</script>

<style>
    .swiper-container{
        padding: 20px 0 40px;
        margin-bottom:20px;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        background: #fff;
        text-align: center;
    }
    .swiper-slide{
        padding: 0 20px;
    }    
    .swiper-slide p{
        margin:0;
        font-size: 20px;
        font-weight: bold;
    }
    .swiper-slide p:last-child{
        margin-bottom:10px;
    }
    .swiper-slide:nth-child(1) p span{
        color:#dc3545;
    }
    .swiper-slide:nth-child(2) p span{
        color:#007bff;
    }
    .swiper-slide:nth-child(3) p span{
        color:#28a745;
    }
    h6{display: inline-block;}
    .right-count{
        float: right;
        margin-top: 4px;
        font-size: 0.8em;
    }
</style>