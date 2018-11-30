import Vue from 'vue/dist/vue'
import axios from 'axios'
import { setMaxListeners } from 'cluster';
//import fetchPrices from 'api.js'

new Vue({
  el: '#app',
  data () {
    return {
      osData: [],
      cpuData: [],
      cpuDataCurrency: [],
      ramData: [],
      diskData: [],
      errored: false,
      osSelected: false,
      cpuSelected:false,
      ramSelected:false,
      diskSelected:false,
      oS: '',
      cpu: null,
      ram: null,
      disk: null,
      cpuCost: null,
      ramCost: 0,
      diskCost: 0,
      cpuMonthlyCost: 0,
      ramMonthlyCost: 0,
      diskMonthlyCost: 0,
      monthlyCost: 0
    }
  },
  methods: {
    getOS() {
      axios
      .get("https://suitor-front-end-back-end.herokuapp.com/prices/os.json")
      .then(response => {
        console.log(response.data);
        this.osData = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
    },
    getCPU() {
      axios
      .get("https://suitor-front-end-back-end.herokuapp.com/prices/vcpu.json")
      .then(response => {
        console.log(response.data);
        this.cpuData = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
    },
    getRAM() {
      axios
      .get("https://suitor-front-end-back-end.herokuapp.com/prices/ram.json")
      .then(response => {
        console.log(response.data);
        this.ramData = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
    },
    getDisk() {
      axios
      .get("https://suitor-front-end-back-end.herokuapp.com/prices/disk.json")
      .then(response => {
        console.log(response.data);
        this.diskData = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
    },
    resetVals() {
      this.cpuSelected =false,
      this.ramSelected = false,
      this.diskSelected =false,
      this.cpu = null,
      this.ram = null,
      this.disk = null,
      this.cpuCost = null,
      this.ramCost = 0,
      this.diskCost = 0,
      this.cpuMonthlyCost = 0,
      this.ramMonthlyCost = 0,
      this.diskMonthlyCost = 0,
      this.monthlyCost = 0
    },
    disableInvalidOptions() {
      if (this.oS === 'Windows') {
        setTimeout(() => {
          this.$refs.value[4].disabled = true
          this.$refs.value[9].disabled = true
        }, 750)
      } else if (this.oS === 'Rhel') {
        setTimeout(() => {
          this.$refs.value[7].disabled = true
          this.$refs.value[8].disabled = true
        }, 750)
      } else if (this.oS === 'Fedora') {
        setTimeout(() => {
          this.$refs.value[10].disabled = true
          this.$refs.value[11].disabled = true
          this.$refs.value[12].disabled = true
          this.$refs.value[13].disabled = true
        }, 750)
      } else {

      }
    },
    resetConfigBtns() {
      var btns = this.$refs.value;
      for (var index in btns) {
        this.$refs.value[index].disabled = false
        if (index >= 4) {
        this.$refs.value[index].classList.remove('active')
        }
      }
    },
    selectOS(index) {
      this.$refs.value[index].classList.add('active');
      this.osSelected = true;
      const btnVal = index;
      this.resetVals();
      this.resetConfigBtns();
      if (btnVal === 0) {
        this.oS = 'Windows';
        this.$refs.value[1].classList.remove('active');
        this.$refs.value[2].classList.remove('active');
        this.$refs.value[3].classList.remove('active');
        this.disableInvalidOptions();
      } else if (btnVal === 1) {
        this.oS = 'Rhel'
        this.$refs.value[0].classList.remove('active');
        this.$refs.value[2].classList.remove('active');
        this.$refs.value[3].classList.remove('active');
        this.disableInvalidOptions();
      } else if (btnVal === 2) {
        this.oS = 'Fedora'
        this.$refs.value[0].classList.remove('active');
        this.$refs.value[1].classList.remove('active');
        this.$refs.value[3].classList.remove('active');
        this.disableInvalidOptions();
      } else if (btnVal === 3) {
        this.oS = 'Ubuntu'
        this.$refs.value[0].classList.remove('active');
        this.$refs.value[1].classList.remove('active');
        this.$refs.value[2].classList.remove('active');
        this.disableInvalidOptions();
      } else {
        console.log('Something is wrong. OS index is' + btnVal);
      }
    },
    selectCPU(key, value, index) {
      this.cpuSelected = true;
      this.cpu = value;
      this.cpuCost = this.formatPrice(key);
      this.calculateMonthlyCPU();
      this.calculateTotalMonthlyCost();
      this.$refs.value[index+4].classList.add('active');
      if (index === 0) {
        this.$refs.value[5].classList.remove('active');
        this.$refs.value[6].classList.remove('active');
        this.$refs.value[7].classList.remove('active');
        this.$refs.value[8].classList.remove('active');
      } else if (index === 1) { 
        this.$refs.value[4].classList.remove('active');
        this.$refs.value[6].classList.remove('active');
        this.$refs.value[7].classList.remove('active');
        this.$refs.value[8].classList.remove('active');
      } else if (index === 2) { 
        this.$refs.value[4].classList.remove('active');
        this.$refs.value[5].classList.remove('active');
        this.$refs.value[7].classList.remove('active');
        this.$refs.value[8].classList.remove('active');   
      } else if (index === 3) { 
        this.$refs.value[4].classList.remove('active');
        this.$refs.value[5].classList.remove('active');
        this.$refs.value[6].classList.remove('active');
        this.$refs.value[8].classList.remove('active');
      } else if (index === 4) { 
        this.$refs.value[4].classList.remove('active');
        this.$refs.value[5].classList.remove('active');
        this.$refs.value[6].classList.remove('active');
        this.$refs.value[7].classList.remove('active');
      } else {
        console.log('cpu not working. index is ' + index);
      }
    },
    selectRAM(key, value, index) {
      this.ramSelected = true;
      this.ram = value;
      this.ramCost = this.formatPrice(key);
      this.calculateMonthlyRAM();
      this.calculateTotalMonthlyCost()
      this.$refs.value[index+9].classList.add('active');
      if (index === 0) {
        this.$refs.value[10].classList.remove('active');
        this.$refs.value[11].classList.remove('active');
        this.$refs.value[12].classList.remove('active');
        this.$refs.value[13].classList.remove('active');
      } else if (index === 1) { 
        this.$refs.value[9].classList.remove('active');
        this.$refs.value[11].classList.remove('active');
        this.$refs.value[12].classList.remove('active');
        this.$refs.value[13].classList.remove('active');
      } else if (index === 2) { 
        this.$refs.value[9].classList.remove('active');
        this.$refs.value[10].classList.remove('active');
        this.$refs.value[12].classList.remove('active');
        this.$refs.value[13].classList.remove('active');   
      } else if (index === 3) { 
        this.$refs.value[9].classList.remove('active');
        this.$refs.value[10].classList.remove('active');
        this.$refs.value[11].classList.remove('active');
        this.$refs.value[13].classList.remove('active');
      } else if (index === 4) { 
        this.$refs.value[9].classList.remove('active');
        this.$refs.value[10].classList.remove('active');
        this.$refs.value[11].classList.remove('active');
        this.$refs.value[12].classList.remove('active');
      } else {
        console.log('ram is not working. index is ' + index);
      }
    },
    selectDisk(key, value, index) {
      this.diskSelected = true;
      this.disk= value;
      this.diskCost = this.formatPrice(key);
      this.calculateMonthlyDisk();
      this.calculateTotalMonthlyCost();
      this.$refs.value[index+14].classList.add('active');
      if (index === 0) {
        this.$refs.value[15].classList.remove('active');
        this.$refs.value[16].classList.remove('active');
        this.$refs.value[17].classList.remove('active');
        this.$refs.value[18].classList.remove('active');
      } else if (index === 1) { 
        this.$refs.value[14].classList.remove('active');
        this.$refs.value[16].classList.remove('active');
        this.$refs.value[17].classList.remove('active');
        this.$refs.value[18].classList.remove('active');
      } else if (index === 2) { 
        this.$refs.value[14].classList.remove('active');
        this.$refs.value[15].classList.remove('active');
        this.$refs.value[17].classList.remove('active');
        this.$refs.value[18].classList.remove('active');   
      } else if (index === 3) { 
        this.$refs.value[14].classList.remove('active');
        this.$refs.value[15].classList.remove('active');
        this.$refs.value[16].classList.remove('active');
        this.$refs.value[18].classList.remove('active');
      } else if (index === 4) { 
        this.$refs.value[14].classList.remove('active');
        this.$refs.value[15].classList.remove('active');
        this.$refs.value[16].classList.remove('active');
        this.$refs.value[17].classList.remove('active');
      } else {
        console.log('disk is not working. index is ' + index);
      }
    },
    formatPrice(value) {
      let val = (value/10).toFixed(2)
      return val;
    },
    calculateMonthlyCPU() {
      let cost = this.cpuCost;
      this.cpuMonthlyCost = cost * 720;
    },
    calculateMonthlyRAM() {
      let cost = this.ramCost;
      this.ramMonthlyCost = cost * 720;
    },
    calculateMonthlyDisk() {
      let cost = this.diskCost;
      this.diskMonthlyCost = cost * 720;
    },
    calculateTotalMonthlyCost() {
      if (this.oS === 'Rhel') {
        let surcharge = this.osData.rhel.base * 0.001;
        let monthlySurcharge = surcharge * 720;
        this.monthlyCost = this.cpuMonthlyCost + this.ramMonthlyCost + this.diskMonthlyCost + monthlySurcharge;
      } else if (this.oS === 'Fedora') {
        let surcharge = this.osData.fedora.base * 0.001;
        let monthlySurcharge = surcharge * 720;
        this.monthlyCost = this.cpuMonthlyCost + this.ramMonthlyCost + this.diskMonthlyCost + monthlySurcharge;
      } else if (this.oS === 'Windows') {
        let surcharge = this.osData.windows.base * 0.001;
        let monthlySurcharge = surcharge * 720;
        this.monthlyCost = this.cpuMonthlyCost + this.ramMonthlyCost + this.diskMonthlyCost + monthlySurcharge;
      }  else if (this.oS === 'Ubuntu') {
        let surcharge = this.osData.ubuntu.base * 0.001;
        let monthlySurcharge = surcharge * 720;
        this.monthlyCost = this.cpuMonthlyCost + this.ramMonthlyCost + this.diskMonthlyCost + monthlySurcharge;
      } else {
        this.monthlyCost = this.cpuMonthlyCost + this.ramMonthlyCost + this.diskMonthlyCost;
      }
    }
  },
  mounted () {
    this.getOS()
    this.getCPU()
    this.getRAM()
    this.getDisk()
  },

})