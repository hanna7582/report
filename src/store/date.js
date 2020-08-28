const date = {
  weekly: new Date().getFullYear() + zero(nowMonth()),
  monthly: new Date().getFullYear() + zero(prevMonth()),
  year: new Date().getFullYear(),
  week: getWeek(),
}

function zero(num) {
  return num < 10 ? '0' + num : num;
}

function nowMonth() {
  return new Date().getMonth() + 1;
}

function prevMonth() {
  var prevDate = new Date();
  prevDate.setMonth(nowMonth() - 1);
  return prevDate.getMonth();
}

function getWeek(today) {
  var date = new Date();
  if (today) {
    date = new Date(today);
  }
  return Math.ceil(date.getDate() / 7) - 1;
}

//주차 구하기 
function getWeekDatePicker(targetDate) {
  /*
      기준 요일 
      0 1 2 3 4 5 6
      일 월 화 수 목 금 토
  */

  // 기준 날짜
  var now = new Date(targetDate);
  var nowYear = now.getFullYear();
  var nowMonth = now.getMonth() + 1;
  var nowDate = now.getDate();

  // 다음 달
  var nextDate = new Date(targetDate);
  nextDate.setMonth(now.getMonth() + 1);
  nextDate = nextDate.getFullYear() + '-' + zero(nextDate.getMonth() + 1);
  // var nextMonth = nextDate.getMonth() + 1;

  // 이전 달
  var prevDate = new Date(targetDate);
  prevDate.setMonth(now.getMonth() - 1);
  prevDate = prevDate.getFullYear() + '-' + zero(prevDate.getMonth() + 1);

  //요일 
  //   var days = new Array('일', '월', '화', '수', '목', '금', '토');

  //월요일을 중심으로한 주차 구하기
  //이번달 첫날 마지막날 현재날 구하기
  var firstDate, lastDate;
  firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
  lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // console.log('firstDate', firstDate.toLocaleDateString(), days[firstDate.getDay()]);
  // console.log('lastDate', lastDate.toLocaleDateString());

  // 주 달력
  var weekDatePicker = {
    nowYear,
    nowMonth,
    nowDate,
    nextDate,
    prevDate
  };
  // 주 달력 일
  var dates = [];
  // 주 달력 주차
  var weekNum = 1;
  // 1일 무슨 요일?
  var firstDateDay = firstDate.getDay();
  // 주 달력
  var weekDate = [];

  // 1월이면 
  if (nowMonth == 1) {
    //1일이 일요일이면
    if (firstDateDay == 0) {
      weekDate.push({
        weekNum: weekNum++,
        dates: [1],
      });
    }
    for (let index = 1; index <= lastDate.getDate() + firstDateDay - 1; index++) {
      if (index >= firstDateDay) { //1>=1
        dates.push(index - firstDateDay + 1);
      }
      if (index % 7 == 0) {
        weekDate.push({
          weekNum: weekNum++,
          dates
        });
        dates = [];
      }
    }
    if (dates.length != 0) {
      weekDate.push({
        weekNum: weekNum++,
        dates
      });
    }

  } else {
    //1일이 월요일이면
    if (firstDateDay == 1) {
      for (let index = 1; index <= lastDay.getDate(); index++) {
        dates.push(index);
        if (index % 7 == 0) {
          weekDate.push({
            weekNum: weekNum++,
            dates
          });
          dates = [];
        }
      }
      if (week.length != 0) {
        weekDate.push({
          weekNum: weekNum++,
          dates
        });
      }
      //1일이 월요일이 아니면    
    } else {
      var addIndex;
      if (firstDateDay == 0) {
        addIndex = 1;
      } else {
        addIndex = 8 - firstDateDay;
      }
      for (let index = 1; index <= lastDate.getDate(); index++) {
        if (index + addIndex <= lastDate.getDate()) {
          dates.push(index + addIndex);
        }
        if (index % 7 == 0) {
          weekDate.push({
            weekNum: weekNum++,
            dates
          });
          dates = [];
        }
      }
      if (dates.length != 0) {
        weekDate.push({
          weekNum: weekNum++,
          dates
        });
      }
    }

  }
  weekDatePicker.weekDate = weekDate;
  return weekDatePicker;
}

export default date;