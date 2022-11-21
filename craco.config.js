const path = require('path')
// const pxToViewport = require('postcss-px-to-viewport')
// const vw = pxToViewport({
//     // 视口宽度 一般是375
//     viewportWidth: 375
// })
module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用@表示SRC 文件所在路径
            "@": path.resolve(__dirname, 'src'),
            // 约定：使用@scss表示样式 文件所在路径
            "@scss": path.resolve(__dirname, 'src', 'assets', 'style'),

        }
    },
        // style: {
        //     postcss: {
        //         plugins: [vw]
        //     }
        // }
}