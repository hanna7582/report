import { utils } from '../common/utils'

const state = {
  studuent: {
    options: [
      { value: '1804582', text: '김골룸' },
      { value: '1826229', text: '김호빗' },
      { value: '1804581', text: '김도비' }
    ],
    selected: '1804582'
  },
  weekDatePicker: $utils.getWeekDatePicker(new Date()),
  weeklyData: {},
  MonthlyData: {},
  wk: 0,
  yymm: 0,
  yymmdd: $utils.getStringDateVal(new Date()),
  targetDate: new Date(),
  todayWeeklyDate: '',
  todayWk: '',
  homeSummary: {},
  weeklySummary: {},
}

export default state;