module.exports = {
    publicPath: '/datav_vue/',
    devServer: {
        port: "9003",
        proxy: 'http://localhost:9000'
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}