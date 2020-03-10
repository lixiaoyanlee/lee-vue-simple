const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool:'source-map', //便于追查源文件得错误位置
    resolve:{ //更改解析模块得查找方法
        modules:[path.resolve(__dirname,'source'),path.resolve('node_modules')]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'public/index.html')
        })
    ]
}