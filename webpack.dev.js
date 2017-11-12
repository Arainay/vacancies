const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

const outputPath = path.resolve(__dirname, './dist');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: outputPath,
    port: 3000,
    historyApiFallback: true,
    inline: true
  }
});