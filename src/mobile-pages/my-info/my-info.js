let data = {
  avater:'https://gd2.alicdn.com/imgextra/i2/TB1Zv3_SFXXXXXOaFXXYXGcGpXX_M2.SS2_400x400.jpg',
  dataArray:[],
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
    logoutBtnPressed:function () {
      console.log('退出登录');
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