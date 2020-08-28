<template>
    <b-input-group prepend="학생">
        <b-form-select 
            v-model="studuent.selected" 
            :options="studuent.options"
            ></b-form-select>
        <b-input-group-append>
            <b-button variant="primary" @click="searchReport">조회</b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {    
    computed: {
        ...mapState(['studuent','todayWeeklyDate','todayWk']),
    },
    methods: {   
        ...mapMutations(['changeWeekDatePicker']), 
        ...mapActions(['getWeeklyData','getWeeklySummary']), 
        searchReport(){  
            this.changeWeekDatePicker({targetDate:new Date()});                       
            this.getWeeklyData({
                studId:this.studuent.selected, 
                yymm:this.todayWeeklyDate.replace('-',''), 
                wk:this.todayWk
            })             
            this.getWeeklySummary({
                studId:this.studuent.selected, 
                yymm:this.todayWeeklyDate.replace('-',''), 
                wk:this.todayWk
            })  
        }
    }
}
</script>

<style>

</style>