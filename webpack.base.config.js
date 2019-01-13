const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './app/main.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    //publicPath: 'http://trading-tool.pro/new',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', 'css', 'scss'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.style.js$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 2 } },
          { loader: 'postcss-loader', options: { parser: 'postcss-js' } },
          'babel-loader',
        ],
      },
      {
        test: /\.(css|scss)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
            },
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],

  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),

  ],
};
