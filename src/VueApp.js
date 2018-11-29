import Vue from 'vue/dist/vue'
import axios from 'axios'
//import fetchPrices from 'api.js'

new Vue({
  el: '#app',
  data () {
    return {
      osData: [],
      cpuData: [],
      ramData: [],
      diskData: [],
      errored: false,
      osSelected: false,
      oS: ''
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
    selectOS(index) {
      console.log(this.$refs.value[index].classList);
      this.$refs.value[index].classList.add('active');
      this.osSelected = true;
      const btnVal = index;
      if (btnVal === 0) {
        this.oS = 'Windows';
        this.$refs.value[1].classList.remove('active');
        this.$refs.value[2].classList.remove('active');
        this.$refs.value[3].classList.remove('active');
      } else if (btnVal === 1) {
        this.oS = 'Rhel'
        this.$refs.value[0].classList.remove('active');
        this.$refs.value[2].classList.remove('active');
        this.$refs.value[3].classList.remove('active');
      } else if (btnVal === 2) {
        this.oS = 'Fedora'
        this.$refs.value[0].classList.remove('active');
        this.$refs.value[1].classList.remove('active');
        this.$refs.value[3].classList.remove('active');
      } else if (btnVal === 3) {
        this.oS = 'Ubuntu'
        this.$refs.value[0].classList.remove('active');
        this.$refs.value[1].classList.remove('active');
        this.$refs.value[2].classList.remove('active');
      } else {
        this.oS = 'Flying Monkey'
      }
    }
  },
  mounted () {
    this.getOS()
    this.getCPU()
    this.getRAM()
    this.getDisk()
  }
})