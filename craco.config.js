const path = require('path')
module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用@表示SRC 文件所在路径
            "@": path.resolve(__dirname, 'src'),
            // 约定：使用@scss表示样式 文件所在路径
            "@scss": path.resolve(__dirname, 'src','assets','style'),
            
        }
    }
}