const path = require('path')
const Html = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({})
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 7777
    },
    plugins: [
        new Html({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
         
         { test: /\.scss$/, 
           use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
        }
      ]
    }

}