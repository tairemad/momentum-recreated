const webpack = require('webpack')
const path = require('path')


module.exports = () => {
    return {
        entry: {
            main: [
                './src/main.js'
            ]
        },
        output: {
            path: path.join(__dirname, './dist'),
            publicPath: '/dist/',
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false,
                },
            }),
        ],
        devServer: {
            port: 3000
        }
    }
}