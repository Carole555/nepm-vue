export function localGet (key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove (key) {
  window.localStorage.removeItem(key)
}

// // 判断内容是否含有表情字符，现有数据库不支持。
// export function hasEmoji (str = '') {
//   const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
//   return str.match(reg) && str.match(reg).length
// }


export const pathMap = {
  login: '登录',
  index: '首页',
  public: '公众监督数据列表',
  aqi: '确认AQI数据列表',
  province: '省分组分项检查统计',
  distribution: 'AQI空气质量指数级别分布',
  trend: 'AQI空气质量指数超标趋势',
  other: '其他数据统计',
  public_detail: '公众监督数据详情',
  assign: '指派网格员',
  aqi_detail: '确认AQI数据详情'
}
