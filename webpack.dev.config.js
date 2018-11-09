const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: './dist',
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
