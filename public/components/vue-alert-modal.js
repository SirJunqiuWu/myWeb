/***************************************
 * 封装控件时先把模子搭好
 * 界面需要传递过来的值：dic数据源  title弹框标题  show是否展示。 注意:属性值均小写
 * 样式都在引入该组件的h5页面的样式文件里添加，可针对具体的需要修改各自样式
 * 样式: alert-bk alert-bk-show content-box title btn cancel-btn ok-btn
 * 视图之间传值 事件传递
 **************************************/
Vue.component('alert-modal', {
    // 属性值
    props:['dic', 'title', 'left', 'right', 'show'],
    data: function() {
        return {
          // 交互时将该数据源传给上层视图 该数据源赋值为传递进来的数据源
            dataDic:{},
        }
    },
    template: '<div class="alert-bk" :class="{\'alert-bk-show\':show}"><div class="content-box"><div class="title">{{title}}</div><div class="function-btn"><div class="btn cancel-btn" @click="cancelBtnPressed(dic)">{{left}}</div><div class="btn ok-btn" @click="okBtnPressed(dic)">{{right}}</div></div></div></div>',
    methods:{
        cancelBtnPressed:function (e) {
            this.dataDic = e;
            this.$emit('cancel-clicked', this.dataDic);
        },
        okBtnPressed:function (e) {
            this.dataDic = e;
            // 向父视图传递名为ok-clicked的事件
            this.$emit('ok-clicked', this.dataDic);
        }
    },
});