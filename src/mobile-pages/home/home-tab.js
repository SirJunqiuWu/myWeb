let data = {
  banners:[],
  dataArray:[],
};

let app = new Vue({
  el:'#app',
  data:data,
  created:function() {
    setTimeout(function () {
      uploadDataReq();
    }, 500);
  },
  methods:{

  },
});

// 网络数据请求
function uploadDataReq() {
  let banners = [];
  let imageArr = [
    'http://b-ssl.duitang.com/uploads/item/201602/03/20160203122405_mLEt3.jpeg',
    'http://b-ssl.duitang.com/uploads/item/201505/16/20150516162147_wTGKQ.jpeg',
    'http://b-ssl.duitang.com/uploads/item/201601/16/20160116173125_Qcw23.jpeg',
    'http://b-ssl.duitang.com/uploads/item/201606/19/20160619101348_zCxRw.jpeg',
    'http://talkimages.cn/images/medium/20133227/tkm002_111998.jpg'
  ];
  for (let i = 0; i < imageArr.length; i += 1) {
    let temp = {};
    temp.image = imageArr[i];
    temp.clickUrl = 'http://www.baidu.com';
    banners.push(temp);
  }
  data.banners = banners;
}
