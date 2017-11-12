const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = path.resolve(__dirname, './dist');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        loader: 'babel-loader',
        options: { presets: ['react', 'stage-0'] }
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/, /dist/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        exclude: [/node_modules/, /dist/],
        use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/assets/index.html'),
      filename: 'index.html',
      path: outputPath
    }),
    new ExtractTextPlugin('styles.css')
  ]
};