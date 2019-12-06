let data = {
  avater:'https://gd2.alicdn.com/imgextra/i2/TB1Zv3_SFXXXXXOaFXXYXGcGpXX_M2.SS2_400x400.jpg',
  dataArray:[],
  show:false,
  title:'确定退出登录吗?'
};

let app = new Vue({
  el:'#app',
  data:data,
  created:function () {
    setTimeout(function () {
      uploadDataReq();
    }, 500)
  },
  methods:{
    cellClicked:function(e) {
      console.log('点击行:', e);
      if (e == 1) {
        showToast('请选择用户性别');
        return;
      };
      if (e == 5) {
        showToast('请给我好评');
        return;
      };
      if (e == 4) {
        data.dataArray[e].des = '0M';
        showHud('清除缓存成功');
      } else if (e == data.dataArray.length - 1) {
          showToast('已经是最新版本');
      } else {
        let temp = data.dataArray[e];
        window.location.href = '../edit-user-info/edit-user-info.html?text=' + temp.des + '&idx=' + e;
      };
    },
    logoutBtnPressed:function () {
      console.log('退出登录');
      data.show = true;
    },
    cancel:function (e) {
      console.log('取消');
      data.show = e;
    },
    ok:function (e) {
      console.log('确定');
      data.show = e;
      showHud('退出登录成功');
    }
  },
});


function uploadDataReq() {
  showHud('加载中');
  let array = [
    {title:'昵称', des:'暖源'},
    {title:'性别', des:'男'},
    {title:'绑定的手机', des:'18321567392'},
    {title:'绑定的支付宝', des:maskStrWithStartIdxAndLength('18321567392', 3, 4)},
    {title:'清空缓存', des:'24.3M'},
    {title:'给我好评', des:''},
    {title:'当前版本', des:'v4.1.2'},
  ];
  data.dataArray = array;
  hideHud();
}