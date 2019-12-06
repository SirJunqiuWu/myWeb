let data = {
  placeholder:'',
  text:'',
  idx:'0',
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
      if (isNullStr(text).length === 0) {
        showToast(data.placeholder);
        return;
      }
      // 返回上一级界面时 上一级界面会重新加载 获取最新数据
      window.history.back(-1);
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
  let idx = getUrlTargetKeyValueWithKey('idx');
  console.log('idx:', idx);
  data.text = text;
  data.idx = idx;
  data.placeholder = getPlaceholderWithIdx(idx);
}

function getPlaceholderWithIdx(e) {
  let text = '';
  switch (e) {
    case '0':
      text = '请填写昵称';
      break;
    case '2':
      text = '请填写手机号';
      break;
    case '3':
      text = '请填写支付宝号';
      break;
    default:
      // 默认
      text = '请填写信息';
      break;
  };
  console.log('text:', text);
  return text;
};