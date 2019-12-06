/* eslint-disable */
/*********************************************************************************
 * 作者：吴俊秋
 * 该文件是项目的工具类文件，常见方法，方便快速获取想要的结果 比如日期、时间戳、url参数的获取
 * 也可以做安全处理：数组安全取值 字符串安全判断  正则匹配等
 *********************************************************************************/
  // 当前显示的hubBk，只能显示一个,showHud时先移除hud
let hudBk = null;

// 获取页面跳转时链接传值的信息字符串
function getUrlAllParmInfo() {
  let result = window.location.search.substr(1);
  result = decodeURI(result);
  return result;
}

function getParamWithObj(obj) {
  let result = null;
  let paramDic = {};
  if (obj.indexOf('&') == -1) {
    // 只有一个参数 数组元素为key=value
    result = obj.split('=');
    if (result && result.length >= 2) {
      let key= result[0];
      let value = result[1];
      paramDic[key] = value;
    }
  }  else {
    // 多个参数时 数组元素为key=value
    result = obj.split('&');
    for (let i = 0; i < result.length; i += 1) {
      let temp = result[i];
      temp = temp.split('=');
      if (temp && temp.length >= 2) {
        let key= temp[0];
        let value = temp[1];
        paramDic[key] = value;
      }
    }
  }
  return paramDic;
}


// 根据指定key和url后拼接的字符串信息获取对应key的值
function getTargetParamWithKeyAndObj(key, obj) {
  let paramDic = getParamWithObj(obj);
  let result = paramDic[key];
  return result;
}

// 根据时间戳和时间格式获取日期描述 eg：2019-11-26 11:37:30
function getDateByTimestampAndFormatter(timestamp, formatter) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  if (formatter === 'yyyy-MM-dd') {
    return year + '-' + month + '-' + day;
  }
  return year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second;
}

// 根据指定日期获取对应日期的时间戳
function getTimestampByDate(date) {
  let result = new Date(date);
  return result.getTime();
}

// 字符串安全处理
function isNullStr(str) {
  let result = '';
  if (!str || str === null || str === 'null'  || str === 'NULL') {
    result = '';
  } else {
    result = str;
  }
  return result;
}

/**
 * 隐藏目标字符串中一段字符, 以*替换(目标字符串必须大于1)
 * targetStr:目标字符串
 * startIdx: 替换段的第一个字符在目标字符中的索引
 * length: 需要替换的字符长度
 **/
function maskStrWithStartIdxAndLength(targetStr, startIdx, length) {
  if (targetStr && targetStr.length == 1) {
    return '*';
  }
  if (targetStr  && targetStr.length >= startIdx + length) {
    // 字符串前面部分 + 替换部分 + 尾部部分
    return targetStr.substring(0, startIdx) + '****' + targetStr.substring(startIdx + length, targetStr.length);
  }
  return targetStr;
}


// 根据索引和数组源获取对应索引的元素
function getObjectAtIndex(idx, datas) {
  if (idx >= datas.length) {
    return {};
  }
  return datas[idx];
}


// 页面交互toast提示
function showToast(msg, duration, minWidth) {
  // 显示时长 默认为2s
  duration = isNaN(duration) ? 2 : duration;

  // toast最小宽度 默认0.6
  minWidth = isNaN(minWidth) ? 0.6 : minWidth;

  // 创建div
  let m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "max-width:60%;padding:0 .14rem;height: .4rem;color: rgb(255, 255, 255);line-height: .4rem;text-align: center;border-radius: .04rem;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: .16rem;" + "min-width:" + minWidth + "rem";

  document.body.appendChild(m);

  setTimeout(function() {
    // 定义消失的时间
    let d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function() {
      // 移除该标签
      document.body.removeChild(m)
    }, d * 1000);
  }, duration * 1000);
}


// 页面交互Hud提示
function showHud(msg, image, duration) {
  // 先移除
  if (hudBk) {
    // 移除该标签
    document.body.removeChild(hudBk)
    hudBk = null;
  }
  // 显示时长 默认为2s
  duration = isNaN(duration) ? 2 : duration;

  // 图标
  if (!image) {
    if (msg.indexOf('成功') != -1 )  {
      image = '../../img/success.png';
    } else if(msg.indexOf('失败') != -1) {
      image = '../../img/failed.png';
    } else {
      image = '../../img/loading.svg';
    }
  }

  // 该段完整代码web段可以用
  // bk.style.cssText = "max-width:60%;width:136px;height:136px;color: rgb(255, 255, 255);text-align: center;border-radius:6px;position: fixed;top: 50%;left: 50%;margin-top: -68px;margin-left: -68px;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0, 0.7);font-size: 16px;";


  // 创建父div
  let bk = document.createElement('div');
  bk.style.cssText = "width:136px;height:136px;color: rgb(255, 255, 255);text-align: center;border-radius:6px;position: fixed;top: 50%;left: 50%;margin-top: -68px;margin-left: -68px;z-index: 999999;background: rgba(0, 0, 0, 0.7);font-size: 16px;";
  document.body.appendChild(bk);
  hudBk = bk;


  // 图标
  let img = document.createElement('img');
  img.src = image;
  img.style.cssText = 'width:50px;height:35px;display:block;margin:16px auto 0';
  bk.appendChild(img);

  // 提示文本
  let text = document.createElement('div');
  text.style.cssText = "margin:8px 0 24px";
  text.innerHTML = msg;
  bk.appendChild(text);

  setTimeout(function() {
    // 定义淡入的时间
    let d = 0.5;
    bk.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    bk.style.opacity = '0';
    if (msg.indexOf('成功') != -1) {
      // 提示为成功的情况 自己移除
      hideHud();
    }
  }, duration * 1000);
}


// 隐藏hud
function hideHud() {
  // 移除该标签
  if (hudBk) {
    setTimeout(function () {
      document.body.removeChild(hudBk)
      hudBk = null;
    }, 0.5 * 1000)
  }
}