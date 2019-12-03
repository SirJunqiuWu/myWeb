/* eslint-disable */
let data = {
  navTitle:"我的",
  message:"消息1",
  dataArray:[],
  loading:true,
  showAlert:false,
  cellDic:{},
};
// data.dataArray = uploadDataReq();

function uploadDataReq() {
    let param = {};
    getDataReq({
        url: getUserInfoReqURL,
        param: param,
        successd:function (res) {
            console.log('请求成功:', res);
            data.dataArray = res.data.data;
        },
        failed:function (msg) {
            console.log('请求失败:', msg);
        }});

  // let datas = data.dataArray;
  // let titleArr = ['邀请得杯', '常见问题', '客户服务', '设备申请', '关于我们', '系统设置'];
  // for (let i = 0; i < 6; i += 1) {
  //   let temp = {};
  //   let nameIndex = i + 1;
  //   temp.title = titleArr[i];
  //   temp.image = '../../img/my-info-img/p' + nameIndex + '.png';
  //   temp.name = '吴俊秋';
  //   datas.push(temp);
  // }
  // datas.dataArray = datas;
  // return datas;
};

// 自定义cell
// Vue.component('title-text-cell', {
//   // 父视图向底层派发数据源 props 父子视图解耦
//   props:['temp', 'idx'],
//   data: function() {
//     return {
//       dataDic:{},
//     }
//   },
//   template:'<li class="myCell" @click="cellClicked(temp, idx)"><div class="left"><img class="icon" :src="temp.image" alt=""><div class="cellTitle">{{temp.title}}</div></div><div><img class="rightArrow" src="../../img/my-info-img/arrow_right.png" alt=""></div></li>',
//   methods: {
//     // cell点击事件
//     cellClicked:function(e, idx) {
//       this.dataDic = e;
//       // 向上层传递事件和值 上层只需要实现这个key(cell-clicked)对应的方法就能拿到子视图传递的值（key和方法都可以自己命名）
//       this.$emit('cell-clicked', this.dataDic, idx);
//     }
//   },
// });


// 定义vue实例对象
let app = new Vue({
  el:"#app",
  data:data,
  // 生命周期钩子函数
  beforeCreate:function() {
    console.log('在实例初始化后 数据观测和事件配置之前被调用');
  },

  created:function() {
    console.log('在实例创建完成后被立即调用，挂载阶段还没开始，$el属性目前不可见');
    setTimeout(function() {
      data.loading = false;
      uploadDataReq();
    }, 2000);
  },

  methods:{
    cancelBtnPressed:function () {
          console.log('取消');
          data.showAlert = false;
     },
      okBtnPressed:function () {
          console.log('确定');
          window.location.href = '../taskHistory/taskHistory.html?title=' + data.cellDic.title + '&name=' + data.cellDic.name;
      },
    getMoreData:function() {
      uploadDataReq();
    },
    cellClicked:function(e, idx) {
      console.log('当前行点击事件:', e, idx);
      data.showAlert = true;
      data.cellDic = e;
    },
  },
});


// 对属性值进行监听
app.$watch('dataArray', function(newValue, oldValue) {
  console.log('key值变化前后:', oldValue, newValue);
});