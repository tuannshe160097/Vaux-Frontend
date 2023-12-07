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

Vue.filter('fancyTimeFormat', (duration: number) => {
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  } else {
    ret += "0"
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
})

Vue.filter('addressFomat', (addressObj: any)=> {
  
  let address = "";
  if (addressObj?.houseNumber) {
    address += addressObj.houseNumber
  }
  if (addressObj?.street) {
    address +=  "-" + addressObj.street
  }
  if (addressObj?.district) {
    address += "-" + addressObj.district
  }
  if (addressObj?.city) {
    address += "-" + addressObj.city
  }
  return address
})

Vue.filter('moneyNumberFomat', (number: number)=> {
  if (!number) return 0
  return (number).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
})
