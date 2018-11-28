import Vue from 'vue/dist/vue'
import axios from 'axios'
//import fetchPrices from 'api.js'

new Vue({
  el: '#app',
  data () {
    return {
      osData: [],
      loading: true,
      errored: false
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
    }
  },
  mounted () {
    this.getOS()
  }
})