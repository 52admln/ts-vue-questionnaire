const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 9191
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
