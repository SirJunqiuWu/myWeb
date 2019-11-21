/* eslint-disable */

// 选择器字典
let sel = {};
// 控制版本信息弹框显示标志符
let isShowVersionInfo = false;

function sevenDaysAgo(dayCount) {
  return new Date(new Date().getTime() - dayCount * 24 * 60 * 60 * 1000);
}

function today() {
  return new Date();
}

//new 一个Vue对象
var vue = new Vue({
  el: "#app",
  methods: {
    focus() {
      console.log("focus");
    },
    change() {
      console.log("选择结束", vue.date);
    },
    doneSelectTime() {
      console.log("为组件自定义方法");
    }
  },
  data: function() {
    return {
      date: [today(), today()],
      pickerOptions: {
        disabledDate: function(currentDate) {
          return !(currentDate <= today() && currentDate >= sevenDaysAgo(7));
        },
        onPick: function(maxDate, minDate) {
          console.log("选择完时间:", maxDate, minDate);
        }
      },
      list: []
    };
  },
  created() {
    getTestDataReq();
  }
});

// 加载dom
function domReady() {
  // 给选择器赋值
  sel = {
    $operate: $("#operate"),
    $navArrow: $("#navArrow")
  };
}
$(document).ready(domReady);

function navRightClick() {
  isShowVersionInfo = !isShowVersionInfo;
  if (isShowVersionInfo) {
    sel.$navArrow.attr("src", "../../img/selected-up.png");
    sel.$operate.css("display", "block");
  } else {
    sel.$navArrow.attr("src", "../../img/down-arrow.png");
    sel.$operate.css("display", "none");
  }
}

// 测试数据
function getTestDataReq() {
  let datas = [];
  for (let i = 0; i < 5; i += 1) {
    const item = {};
    item.time = getShowTimeByTimeStampAndFormat(
      1572493446000,
      "yyyy-MM-dd HH:mm:ss"
    );
    if (i === 0) {
      item.num = 1000;
      item.startPoint = "起点:B2库区南1号门1号月台库区南1号门1";
      item.endPoint = "终点:A1库区南2号门3号月台";
      item.goodsName = "1*24*250ml高钙奶好喝的奶很舒服的奶粉";
      item.missionStatus = 3;
    } else {
      item.num = 10;
      item.startPoint = "起点:月台8";
      item.endPoint = "终点库位A-A008";
      item.goodsName = "1*125ml*30伊利纯牛奶";
      item.missionStatus = 1;
    }
    item.statusDes = item.missionStatus != 3 ? "异常" : "";
    datas.push(item);
  }

  // 赋值
  setTimeout(function() {
    vue.list = datas;
  });
}

// 获取当前时间显示 格式:yyyy-MM-dd HH:mm:ss
function getShowTimeByTimeStampAndFormat(timestamp, format) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  if (format === "yyyy-MM-dd") {
    return year + "-" + month + "-" + day;
  }
  return (
    year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second
  );
}
