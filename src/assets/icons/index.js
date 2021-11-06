import Vue from 'vue'
import SvgIcon from '@/components/svgicon/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)