import Vue from 'vue'
const dayjs = require('dayjs')

// -- [ Format date time] -----------------------------------------------
Vue.filter('dateTimeFomat', (value: string, format: string = 'DD-MM-YYYY') => {
  try {
    return dayjs(new Date(value)).format(format)
  } catch (error) {
    return ''
  }
})