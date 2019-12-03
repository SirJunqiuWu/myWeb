/* eslint-disable */
/*********************************************************************************
 * 作者：吴俊秋
 * 该文件是项目的工具类文件，常见方法，方便快速获取想要的结果 比如日期、时间戳、url参数的获取
 * 也可以做安全处理：数组安全取值 字符串安全判断  正则匹配等
*********************************************************************************/

const testApi = 'testaaa';

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

// 根据索引和数组源获取对应索引的元素
function getObjectAtIndex(idx, datas) {
  if (idx >= datas.length) {
    return {};
  }
  return datas[idx];
}