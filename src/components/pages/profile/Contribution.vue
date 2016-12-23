<template>
  <div class="panel">
    <div class="panel-heading">Contributions</div>
    <div class="panel-body">
      <div class="contributions-graph">
        <div class="calendar-row">
          <div class="cell weekday-heading contrib_empty">
          </div>
          <template v-for="month in months">
            <div class="cell contrib_empty"
                 :class="{'month-heading': month}">
              {{ month }}
            </div>
          </template>
        </div>
        <template v-for="index in 7">
          <div class="calendar-row">
            <div class="cell weekday-heading contrib_empty">
              {{ index == 2 ? 'Mon' : '' }}
              {{ index == 4 ? 'Wed' : '' }}
              {{ index == 6 ? 'Fri' : '' }}
            </div>
            <template v-for="count in 53">
              <div class="cell"
                   :class="{'contrib_empty': !days[count][index - 1],
                            'contrib-grade-0': days[count][index - 1] && checkCount(days[count][index - 1], 0),
                            'contrib-grade-1': days[count][index - 1] && checkCount(days[count][index - 1], 1),
                            'contrib-grade-2': days[count][index - 1] && checkCount(days[count][index - 1], 2),
                            'contrib-grade-3': days[count][index - 1] && checkCount(days[count][index - 1], 3),
                            'contrib-grade-4': days[count][index - 1] && checkCount(days[count][index - 1], 4)}">
                <span><strong>{{ checkCount(days[count][index - 1]) }} contributions</strong> {{ days[count][index - 1] }}</span>
              </div>
            </template>
          </div>
        </template>
        <div class="calendar-row legend">
          <div class="cell weekday-heading contrib_empty"></div>
          <div class="cell contrib_empty rank-desc">Less</div>
          <div class="cell contrib_empty"></div>
          <div class="cell contrib_empty contrib-grade-0"></div>
          <div class="cell contrib_empty contrib-grade-1"></div>
          <div class="cell contrib_empty contrib-grade-2"></div>
          <div class="cell contrib_empty contrib-grade-3"></div>
          <div class="cell contrib_empty contrib-grade-4"></div>
          <div class="cell contrib_empty"></div>
          <div class="cell contrib_empty rank-desc">More</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import api from 'api'

export default {
  data () {
    let currentDay = moment()
    let beginDay
    let endDay = currentDay.format('YYYY-MM-DD')
    let count = 1
    let months = []
    let days = {}
    while (count <= 53) {
      let week = []
      if (count !== 1) {
        week.push(currentDay.format('YYYY-MM-DD'))
        currentDay.subtract(1, 'days')
      }
      if (count === 53) {
        beginDay = currentDay.format('YYYY-MM-DD')
      }
      let weekDay = currentDay.weekday()
      while (weekDay >= 0) {
        week.push(currentDay.format('YYYY-MM-DD'))
        currentDay.subtract(1, 'days')
        weekDay -= 1
      }
      days[54 - count] = week.reverse()
      let [month, day] = currentDay.format('MMM-DD').split('-')
      day = parseInt(day)
      if (day <= 7) {
        months.push(month)
      } else {
        months.push('')
      }
      count += 1
    }
    months = months.reverse()
    return {
      beginDay: beginDay,
      endDay: endDay,
      months: months,
      days: days,
      dayInfo: {}
    }
  },
  methods: {
    checkCount: function (date, levelNum) {
      let level
      if (this.dayInfo[date]) {
        let count = this.dayInfo[date]
        if (count <= 2) { // 1-2
          level = 1
        } else if (count > 2 && count <= 5) { // 3-5
          level = 2
        } else if (count > 5 && count <= 10) { // 6-10
          level = 3
        } else { // 11
          level = 4
        }
      } else {
        level = 0
      }
      if (levelNum === undefined) {
        return this.dayInfo[date] ? this.dayInfo[date] : 'No'
      } else {
        return level === levelNum
      }
    }
  },
  mounted: function () {
    api.user.getContributions({
      begin: this.beginDay,
      end: this.endDay,
      username: this.$route.params.username
    }).then(result => {
      this.dayInfo = result
    })
  }
}
</script>
<style lang="scss" scoped>
.contrib-grade-0 {
  background-color: #eee;
}
.contrib-grade-1 {
  background-color: #d6e685;
}
.contrib-grade-2 {
  background-color: #8cc665;
}
.contrib-grade-3 {
  background-color: #44a340;
}
.contrib-grade-4 {
  background-color: #1e6823;
}
/*------------------------------------*\
  # CELLS
\*------------------------------------*/
.calendar-row {
  display: table;
  border-spacing: 2px 1px;
  max-height: 5px;
}
.cell {
  width: 10px;
  height: 10px;
  display: table-cell;
  position: relative;
  resize: none;
  strong {
    color: white;
  }
  :hover {
    z-index: 25;
    border: 1px solid #333;
  }
  span {
    display: none;
  }
}

.cell:hover span {
  width: 235px;
  height: 30px;
  top: -45px;
  left: -110px;
  display: inline-block;
  position: absolute;
  background-color: rgba(1, 1, 1, 0.8);
  color: white;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  line-height: 30px;
  vertical-align: middle;
}
.cell:hover span:before {
  border: solid;
  border-color: rgba(1, 1, 1, 0.8) transparent;
  border-width: 7px 7px 0 7px;
  bottom: -7px;
  content: "";
  left: 110px;
  position: absolute;
  z-index: 99;
}
.contrib_empty:hover {
  border: none;
  span {
    display: none;
  }
}
.weekday-heading {
  color: #767676;
  text-align: right;
  font-size: 8.4px;
  padding-right: 3px;
  width: 30px;
}
.month-heading {
  width: 10px;
  height: 10px;
  max-width: 10px;
  max-height: 10px;
  font-size: 10px;
  text-align: left;
  color: #767676;
}
.rank-desc {
  font-size: 8.4px;
}
.legend {
  margin-top: 6px;
  margin-bottom: 8px;
}
</style>
