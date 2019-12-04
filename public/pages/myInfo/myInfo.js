/* eslint-disable */
let data = {
  navTitle:"我的",
  dataArray:[],
  loading:true,
  showAlert:false,
  cellDic:{},

  alertTitle:'是否确定取消任务?',
  leftTitle:'取消',
  rightTitle:'确定',
  showAlert:false,
};

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
      }
    });
};


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
    cancelBtnPressed:function (e) {
      console.log('取消:', e);
      data.showAlert = false;
    },
    okBtnPressed:function (e) {
      console.log('确定:', e);
      data.showAlert = false;
      //界面跳转
      // window.location.href = '../taskHistory/taskHistory.html?title=' + e.title + '&name=' + e.name;
    },
    cellClicked:function(e, idx) {
      console.log('当前行点击事件:', e, idx);
      data.cellDic = e;
      data.showAlert = true;
    },
    refreshData:function () {
      uploadDataReq();
    }
  },
});


// 对属性值进行监听
app.$watch('dataArray', function(newValue, oldValue) {
  console.log('key值变化前后:', oldValue, newValue);
});