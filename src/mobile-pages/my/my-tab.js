let data = {
  dataArray:[],
  image:'../../../public/img/loading.svg',
  title:'加载中',
  show:false,
};

let app = new Vue({
  el:'#app',
  data:data,
  created:function() {
    console.log('在实例创建完成后被立即调用，挂载阶段还没开始，$el属性目前不可见，此时操作el会有问题');
    setTimeout(function () {
      // 获取数据
      uploadDataReq();
    }, 500)
  },
  methods:{
    cellClicked:function(e, idx) {
      console.log('当前行点击事件:', e, idx);
      window.location.href = '../my-info/my-info.html?title=' + e.title + '&name=' + e.name;
    },
    refreshData:function () {
      uploadDataReq();
    }
  },
});

// 网络请求
function uploadDataReq() {
  showHud('加载中', '../../../public/img/loading.svg');
  getDataReq({
    url: getUserInfoForMobileReqURL,
    param: {},
    successd:function (res) {
      hideHud();
      data.dataArray = res.data.data;
    },
    failed:function (msg) {
      hideHud();
      showToast(msg);
    },
  });
}

