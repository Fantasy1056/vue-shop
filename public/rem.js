function remSize() {
  // 获取设备得宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  // 750px ---> 1rem = 100px  375px --> 1rem = 50px
  document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
  // 设置字体大小 0.3rem = 15px
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
// 当窗口变化重新改变设置字体
window.onresize = function () {
  remSize()
}
