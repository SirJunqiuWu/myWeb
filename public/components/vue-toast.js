/************************************
 * 文本提示  eg:密码错误 请先填写账号等
 ***********************************/
Vue.component('toast', {
  props:['text', 'show'],
  data:function () {
    return {

    }
  },
  template:'<div class="toast-bk" :class="{\'toast-bk-show\':show}">{{text}}</div>',
  methods:{

  },
});