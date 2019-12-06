let data = {
  placeholder:'',
  text:'',
};

let app = new Vue({
  el:'#app',
  data:data,
  created:function () {
    setTimeout(function () {
      uploadDataReq();
    }, 500);
  },
  methods:{
    userFocus:function () {
      console.log('获取焦点');
    },
    userBlur:function (e) {
      console.log('失去焦点:', e);
      let text = $('#myInput').val();
      console.log('文本框值:', text);
    },
    clearInput:function () {
      console.log('清除文本框');
      data.text = '';
    },
    // 确定按钮点击
    ok:function () {
      let text = $('#myInput').val();
      if (isNullStr(text) === '') {
        showToast(data.placeholder);
        return;
      }
    },
  },
});


// 监听文本框值实时变化
function inputVlueChanged() {
  let text = $('#myInput').val();
  console.log('文本框值变化:', text);
}

function uploadDataReq() {
  let text = getUrlTargetKeyValueWithKey('text');
  let placeholder = getUrlTargetKeyValueWithKey('placeholder');
  data.text = text;
  data.placeholder = placeholder;
}