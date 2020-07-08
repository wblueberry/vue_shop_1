import Vue from 'vue'
import { Button, Input, Form, FormItem, Message } from 'element-ui'
// 导入弹框提示组件
// import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 全局挂载Message
Vue.prototype.$message = Message
