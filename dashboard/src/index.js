'use strict'

require('../env')

const Vue = require('vue')
const VCharts = require('v-charts')

Vue.use(VCharts)

module.exports = new Vue({
  el: '#root',
  data () {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    },
    this.chartSettings = {
      labelMap:{
        'confirmedNum': '确诊人数',
        'curesNum': '治愈人数',
        'suspectedNum':'新增人数',
	'deathsNum':'死亡人数'
      }
    }
    return {
      message: 'Click me!',
      isVisible: true,
      chartData: {
        columns: ['date','confirmedNum','suspectedNum','curesNum','deathsNum'],
        rows: []
      }
    }
  },
  methods: {
    async queryServer() {
      const response = await fetch(window.env.apiUrl)
      const result = await response.json()
      this.message = result.message
    },
    async getPatient() {
      const response = await fetch(window.env.apiUrlSZ)
      const result = await response.json()
      // handle chart data
      const rows = result.data;
      // add new patient
/*
      for (var days = 0; days < rows.length-1; days++){
        rows[days].suspect = rows[days].confirm-rows[days+1].confirm;
      }
      rows.sort((a, b) => {
        return new Date(a.create_time) - new Date(b.create_time);
      })
*/
      this.chartData.rows = rows
    }
  }
})
