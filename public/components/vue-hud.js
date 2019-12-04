/*****************************************
 * Hud提示框:加载中 获取成功/失败等提示
 * image图标 title提示文本
 * 图标大小需要统一
 *****************************************/
Vue.component('hud', {
  props:['image', 'title', 'show'],
  data:function () {
    return {

    }
  },
  template:'<div class="hud-bk" :class="{\'hud-bk-show\':show}"><img :src="image" alt=""><div class="text">{{title}}</div></div>',
  methods:{

  },
});