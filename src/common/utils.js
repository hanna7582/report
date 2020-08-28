/*
 * Common Utils
 */

function Utils() {
  this.store = null;
  this.router = null;

  this.init = function(store, router) {
    this.store = store;
    this.router = router;
  };

  //컴포넌트 내 ID값으로 엘리먼트 찾기
  this.getChildComponentByID = function(children, id) {
    for (let key in children) {
      let child = children[key]
      if (child.$el.id == id) {
        return child;
      }
    }
  }

  //빈 객체 체크
  this.isObjEmpty = function(obj) {
    return Object.keys(obj).length === 0;
  }

  //전화번호 -하이픈 추가
  this.phoneFormat = function(num, type) {
    var formatNum = '';

    if (num.length == 11) {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
      } else {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    } else if (num.length == 8) {
      formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (num.length == 9) {
      if (type == 0) {
        formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-****-$3');
      } else {
        formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    } else {
      if (num.indexOf('02') == 0) {
        if (type == 0) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
        } else {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }
      } else {
        if (type == 0) {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
        } else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
      }
    }
    return formatNum;
  }

  //과목별 색상
  this.getSubjectColor = function(grade, subject) {
    let retValue = ''

    if (grade == 'ELE') { //ELE 초등, MID 중등
      switch (subject) {
        case '국어':
          retValue = '#416ee1'
          break
        case '수학':
          retValue = '#e74747'
          break
        case '사회':
          retValue = '#6bc230'
          break
        case '과학':
          retValue = '#fb9813'
          break
        case '영어':
          retValue = '#2cafb4'
          break
        case '통합':
          retValue = '#757575'
          break
        case '영어캠프':
          retValue = '#5ba1bb'
          break
        case '수학플러스':
          retValue = '#6b5eb8'
          break
        case '한자서당':
          retValue = '#b04ff5'
          break
        case '주제학습':
          retValue = '#ec63bd'
          break
        case '글로벌리더쉽':
          retValue = '#b7b7b7'
          break
        default:
          retValue = '#b7b7b7'
          break
      }
    } else {
      switch (subject) {
        case '국어':
          retValue = '#32a7eb'
          break
        case '수학':
          retValue = '#ff795e'
          break
        case '사회':
          retValue = '#92b100'
          break
        case '과학':
          retValue = '#23ce90'
          break
        case '영어':
          retValue = '#9b73fd'
          break
        case '역사':
          retValue = '#af6f5c'
          break
        case '개념수학':
          retValue = '#ff795e'
          break
        case '영어전문관':
          retValue = '#9b73fd'
          break
        case '수학전문관':
          retValue = '#ff795e'
          break
        case '인증시험관':
          retValue = '#3e65ef'
          break
        default:
          retValue = '#b7b7b7'
          break
      }
    }

    return retValue
  }

  /**
   * Date 문자열 값으로 변환
   * @param {date} date
   * @return {string} yyyy-MM-dd
   */
  this.getStringDateVal = (date) => {
    let result = ""

    let year = date.getFullYear()
    let mounth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()

    result = "" + year + '-' + mounth + '-' + day

    return result
  }

  /**
   * Date 문자열 값으로 변환
   * @param {date} date
   * @return {string} yyyyMM
   */
  this.getStringYymm = (date) => {
    let result = ""

    let year = date.getFullYear()
    let mounth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)

    result = "" + year + mounth

    return result
  }

  /**
   * 월요일 부터 시작하는 일주일
   * 월요일값으로 주차 구하기
   * @param {date} date
   */
  this.getWeekNumberByDate = (date) => {
    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    let strCurrDate = this.getStringDateVal(date)
    let weekNumber = 0;

    for (let i = 1; i <= lastDate; i++) {
      let chkDate = new Date(date.getFullYear(), date.getMonth(), i)
      let chkDay = chkDate.getDay()
      let strChkDate = this.getStringDateVal(chkDate)

      // 월요일 체크
      if (chkDay === 1) {
        weekNumber++
      }

      if (strChkDate === strCurrDate) {
        break;
      }
    }

    return weekNumber
  };

  this.zero = (num) => {
    return num < 10 ? '0' + num : num;
  }

  /**
   * 문자열 시간 값 얻기
   * @param {number} seconds 
   */
  this.getTimeStringBySeconds = (seconds) => {
    let hour = parseInt(seconds / 3600);
    let min = parseInt((seconds % 3600) / 60);
    let sec = seconds % 60;

    let result = ""

    if (hour > 0) {
      result += hour + "시간 "
    }

    if (min > 0) {
      result += min + "분"
    }

    if (hour === 0 && min === 0) {
      result += sec + "초"
    }

    return result
  }

  /**
   * 월요일부터 시작하는 달력 
   * @param {dateObj} dateObj
   */
  this.getWeekDatePicker = (dateObj) => {
    /*
        0 1 2 3 4 5 6
        일 월 화 수 목 금 토
    */

    // 기준 날짜
    var now = new Date(dateObj);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var nowDate = year + '-' + this.zero(month);

    // 다음 달
    var nextDate = new Date(dateObj);
    nextDate.setMonth(now.getMonth() + 1);
    nextDate = nextDate.getFullYear() + '-' + this.zero(nextDate.getMonth() + 1);
    // var nextMonth = nextDate.getMonth() + 1;

    // 이전 달
    var prevDate = new Date(dateObj);
    prevDate.setMonth(now.getMonth() - 1);
    prevDate = prevDate.getFullYear() + '-' + this.zero(prevDate.getMonth() + 1);

    //요일 
    var days = new Array('일', '월', '화', '수', '목', '금', '토');

    //월요일을 중심으로한 주차 구하기
    //이번달 첫날 마지막날 현재날 구하기
    var firstDate, lastDate;
    firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
    lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 주 달력
    var weekDatePicker = {
      year,
      month,
      date,
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
    if (month == 1) {
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
        for (let index = 1; index <= lastDate.getDate(); index++) {
          dates.push(index);
          if (index % 7 == 0) {
            weekDate.push({
              weekNum: weekNum++,
              dates
            });
            dates = [];
          }
        }
        if (weekDate.length != 0) {
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
    weekDatePicker.weekDate.forEach(week => {
      week.dates.forEach(date => {
        if (date == weekDatePicker.date) {
          weekDatePicker.nowWeek = week.weekNum - 1;
        }
      })
    })
    return weekDatePicker;
  }

  /**
   * 이전 주차 구하기
   * @param {dateObj} date
   */
  this.pastWeek = (dateObj) => {
    var pastWeekResult;
    var weekDatePicker = this.getWeekDatePicker(dateObj);
    weekDatePicker.weekDate.forEach(week => {
      week.dates.forEach(date => {
        if (date == weekDatePicker.date) {
          pastWeekResult = week.weekNum - 1;
        }
      })
    })
    return pastWeekResult;
  }

  /**
   * 타임 스탬프 값 비교로 레이블명 얻기
   * @param {timestamp} target
   * @param {timestamp} curr
   */
  this.getTimeLabelByCompare = (target, curr) => {
    let difference = parseInt(curr) - parseInt(target)
    let oneDayTS = 24 * 60 * 60 * 1000
    let oneTimeTS = 60 * 60 * 1000
    let resultStr = ""

    if (difference < oneTimeTS) {
      resultStr = "방금 전"
    } else if (difference < oneDayTS) {
      let time = Math.floor(difference / oneTimeTS)
      resultStr = time + "시간 전"
    } else {
      let date = new Date(target)
      let dateStr = this.getStringDateVal(date)
      resultStr = dateStr.substr(0, 4) + "." + dateStr.substr(4, 2) + "." + dateStr.substr(6, 2)
    }

    return resultStr
  };

  /**
   * 초등 홈 써머리 No Data 메시지
   */
  this.getHomeSummaryNoDataMsg = () => {
    return "학습리포트 발행 전입니다.<br/>데이터를 차곡차곡 쌓아보세요."
  }

  /**
   * 중등 수행률 별 메시지
   * @param {number} percent
   */
  this.getMidMessageByPerformance = (percent) => {

    let result = ""

    if (percent === 100) {
      result = "수행률이 완벽해요! 계획된 학습을 모두 성실하게 수행했어요."
    } else if (percent >= 80) {
      result = "수행률이 매우 높은 편입니다! 학습 계획에 따라서 성실히 공부하고 있어요."
    } else if (percent >= 40) {
      result = "수행률이 중간인 편이에요. 계획대로 학습하기 위해 노력하고 있어요!"
    } else if (percent >= 0) {
      result = "수행률이 낮은 편이에요. 학습 계획에 따라 규칙적으로 공부할 수 있도록 지도해주세요!"
    } else if (percent === -1) {
      result = "계획된 학습이 없습니다. 바른 학습 습관 형성을 위해 홈런 선생님과 계획을 세워주세요!"
    }

    return result
  };
}


/*
 * 파라미터값을 가져옵니다.
 */
String.prototype.getParam = function(flag) {
  var requestArr = (flag == '?' ? location.search : location.hash).split(flag);
  if (!requestArr || requestArr.length < 2)
    return '';

  var paramArr = requestArr[1].split(/&/g);
  var result = {},
    pArr;
  for (var i in paramArr) {
    pArr = paramArr[i].split(/=/g);
    if (this == pArr[0]) {
      return pArr[1];
    }
    result[pArr[0]] = pArr[1];
  }

  return result;
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

window['$utils'] = window.$utils || new Utils

const install = function(Vue) {
  Vue.prototype.$utils = $utils;
};

export const utils = {
  $utils,
  install
};