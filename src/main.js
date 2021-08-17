import 'bootstrap/dist/css/bootstrap.css'
//import 'popper'
import 'bootstrap/dist/js/bootstrap'

import './router'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
