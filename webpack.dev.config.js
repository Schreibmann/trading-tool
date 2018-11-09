const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 3042,
    historyApiFallback: true,
    overlay: true,
    open: true,
    hot: true,
    contentBase: `${__dirname}/dist`,
  },
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
