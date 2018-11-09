const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.dev.config');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Server up on port:', port);
});
