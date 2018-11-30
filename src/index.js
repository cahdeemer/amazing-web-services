import React from 'react'
import { render } from 'react-dom'
import Vue from 'vue/dist/vue'

import ReactApp from './ReactApp'
import VueApp from './VueApp'

const reactRoot = document.getElementById('react-root')
const vueRoot = document.getElementById('app')

if (reactRoot !== null) {
  console.log('Lets do React!')
  render(<ReactApp/>, reactRoot)

} else if (vueRoot !== null) {
  console.log('Lets do Vue!')
  //new Vue({ el: '#vue-root' })

} else {
  console.log('Lets do something completely different...')
}
