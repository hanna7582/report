import axios from 'axios';

const actions = {
  // 홈 학습 현황
  getHomeSummary(store, payload) {
    axios.get('/api/getHomeSummary', {
        params: {
          studId: payload.studId,
          dt: payload.dt,
        }
      })
      .then(res => {
        store.commit('loadHomeSummary', { data: res.data.data });
      })
      .catch((ex) => {
        console.log('failed:', ex);
      })
  },
  // 주간리포트 
  getWeeklySummary(store, payload) {
    axios.get('/api/getWeeklySummary', {
        params: {
          studId: payload.studId,
          yymm: payload.yymm,
          wk: payload.wk
        }
      })
      .then(res => {
        store.commit('loadWeeklySummary', { data: res.data.data });
      })
      .catch((ex) => {
        console.log('failed:', ex);
      })
  },
  //주간 리포트 주간 데이터
  getWeeklyData(store, payload) {
    //검색 정보 변경 
    store.commit('searchChange', payload);
    // console.log('actions payload', payload);
    axios.get('/api/getWeeklyData', {
        params: {
          studId: payload.studId,
          yymm: payload.yymm,
          wk: payload.wk
        }
      })
      .then(res => {
        // console.log('actions', res);
        store.commit('loadWeeklyData', { data: res.data.data });
      })
      .catch((ex) => {
        console.log('failed:', ex);
      })
  }



}

export default actions;