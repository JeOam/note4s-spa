<template>
  <div class="panel">
    <div class="panel-heading">Contributions</div>
    <div class="panel-body">
      <div class="contributions-graph">
        <div class="calendar-row">
          <template v-for="index in 53">
            <div class="cell contrib_empty">
            </div>
          </template>
          <div class="cell month-heading contrib_empty">Jun</div>
        </div>
        <template v-for="index in 7">
          <div class="calendar-row">
            <div class="cell weekday-heading contrib_empty">
              {{ index == 2 ? 'Mon' : '' }}
              {{ index == 4 ? 'Wed' : '' }}
              {{ index == 6 ? 'Fri' : '' }}
            </div>
            <template v-for="count in 53">
              <div class="cell contrib-grade-0"
                   :class="{'contrib-grade-0': count === 1,
                            'contrib-grade-1': count === 2,
                            'contrib-grade-2': count === 3,
                            'contrib-grade-3': count === 4,
                            'contrib-grade-4': count === 5}">
                <span><strong>No contributions</strong> {{ count }}</span>
              </div>
            </template>
          </div>
        </template>
        <div class="calendar-row legend">
          <div class="cell weekday-heading contrib_empty"></div>
          <div class="cell contrib_empty month-heading rank-desc">Less</div>
          <div class="cell contrib_empty contrib-grade-0"></div>
          <div class="cell contrib_empty contrib-grade-1"></div>
          <div class="cell contrib_empty contrib-grade-2"></div>
          <div class="cell contrib_empty contrib-grade-3"></div>
          <div class="cell contrib_empty contrib-grade-4"></div>
          <div class="cell contrib_empty month-heading rank-desc">&nbsp;More</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    let today = moment().format('YYYY-MM-DD')
    let m = moment
    console.log(moment().startOf('week').format('YYYY-MM-DD'))
    console.log(today)
    m
    // debugger
    return {}
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
  resize: none;
  strong {
    color: white;
  }
  :hover {
    border: 1px solid #333;
  }
}
.contrib_empty:hover {
  border: none;
}
.weekday-heading {
  color: #ccc;
  text-align: right;
  font-size: 0.6em;
  padding-right: 3px;
  width: 30px;
}
.month-heading {
  width: 10px;
  height: 10px;
  font-size: 10px;
  text-align: left;
  color: #767676;
}
.rank-desc {
  font-size: 0.6em;
}
.legend {
  margin-top: 16px;
}
/*------------------------------------*\
  # TOOLTIPS
\*------------------------------------*/
.cell {
  position: relative;
  z-index: 24;
}
.cell:hover {
  z-index: 25;
}
.cell span {
  display: none;
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
.contrib_empty:hover span {
  display: none;
}
</style>
