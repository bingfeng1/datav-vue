import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Row,
    Col,
    Card,
    Input,
    Table,
    TableColumn,
    MessageBox,
    Message,
    Form,
    Select,
    FormItem,
    Option,
    InputNumber,
    Switch,
    Dialog
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(Select)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Dialog)


Vue.prototype.$elMsgBox = MessageBox
Vue.prototype.$message = Message