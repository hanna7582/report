import { utils } from '../common/utils'

const mutations = {
  // 홈 학습 현황
  loadHomeSummary(state, payload) {
    state.homeSummary = payload.data;
    // state.homeSummary = {
    //   msg: payload.data.msg,
    //   yymm: payload.data.yymm
    // }
  },
  //검색 정보 변경 
  searchChange(state, payload) {
    state.studuent.selected = payload.studId;
  },
  // 주간리포트
  loadWeeklySummary(state, payload) {
    state.weeklySummary = payload.data;
  },
  // 주간리포트 데이터 정보 조회
  loadWeeklyData(state, payload) {
    state.weeklyData = payload.data;
  },
  // 주간 달력
  changeWeekDatePicker(state, payload) {
    const changeDate = new Date(payload.targetDate);
    if (payload.change == 'prev') {
      changeDate.setDate(changeDate.getDate() - 7);
    } else if (payload.change == 'next') {
      changeDate.setDate(changeDate.getDate() + 7);
    }
    state.targetDate = changeDate;
    state.weekDatePicker = $utils.getWeekDatePicker(changeDate);
    state.wk = state.weekDatePicker.nowWeek;

    if (state.wk) {
      state.yymm = state.weekDatePicker.nowDate;
    } else {
      var prevWeekDatePicker = $utils.getWeekDatePicker(state.weekDatePicker.prevDate);
      if (state.wk == 0) {
        state.wk = prevWeekDatePicker.weekDate.length;
      } else {
        state.wk = prevWeekDatePicker.weekDate.length - 1;
      }
      state.yymm = state.weekDatePicker.prevDate;
    }
  },
  //오늘 날짜 
  todayWeekDatePicker(state) {
    const today = new Date();
    var weekDatePicker = $utils.getWeekDatePicker(today);
    var wk = weekDatePicker.nowWeek;
    if (wk) {
      state.todayWeeklyDate = weekDatePicker.nowDate;
    } else {
      var prevWeekDatePicker = $utils.getWeekDatePicker(weekDatePicker.prevDate);
      if (wk == 0) {
        state.todayWk = prevWeekDatePicker.weekDate.length;
      } else {
        state.todayWk = prevWeekDatePicker.weekDate.length - 1;
      }
      state.todayWeeklyDate = weekDatePicker.prevDate;
    }
  }
}

export default mutations;