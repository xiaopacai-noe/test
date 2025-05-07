import { createApp } from 'vue'
import './style.css'
import ErrorStackParser from 'error-stack-parser'
import App from './App.vue'
import {findCodeBySourceMap} from './utils/index'
const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    const errorStack = ErrorStackParser.parse(err) //第一项就是出问题的信息
    findCodeBySourceMap(errorStack[0])
}
app.mount('#app')
