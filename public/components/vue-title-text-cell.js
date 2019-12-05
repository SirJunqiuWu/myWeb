/* eslint-disable */
/***************************************************
 * 自定义组件类
****************************************************/

// 自定义cell(icon + 标题)
Vue.component('title-text-cell', {
  // 父视图向底层派发数据源 props(可以多个属性值,想传什么值就什么值) 父子视图解耦
  props:['temp', 'idx'],
  data: function() {
    return {
      dataDic:{},
    }
  },
  template:'<li class="myCell" @click="cellClicked(temp, idx)"><div class="left"><img class="icon" :src="temp.image" alt=""><div class="cellTitle">{{temp.title}}</div></div><div><img class="rightArrow" :src="temp.rightIcon" alt=""></div></li>',
  methods: {
    // cell点击事件
    cellClicked:function(e, idx) {
      this.dataDic = e;
      // 向上层传递事件和值 上层只需要实现这个key(cell-clicked)对应的方法就能拿到子视图传递的值（key和方法都可以自己命名）
      this.$emit('cell-clicked', this.dataDic, idx);
    }
  },
});