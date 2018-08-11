process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  mode: process.env.NODE_ENV,
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src', 'App.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules\/(?!(genero-ui|emoji-mart)\/).*/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          compact: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ]
}
