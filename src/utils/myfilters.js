export const timeformat = (time, spe) => {
  time = new Date(time)
  spe = spe || '-'
  // 实现时间格式化
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = time.getDate()
  // 返回格式化的结果
  return year + spe + month + spe + day
}
