const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader'
                    },
                ]
            },
            {
                test: /\.css$/i,
                exclude: '/node_modules/',
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', './build'),
        filename: 'bundle.js',
        publicPath: '/',

    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html')
        })
    ]
}