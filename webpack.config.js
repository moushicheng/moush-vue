const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: './build',
  },
  mode:"development",
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  resolve:{
    extensions: ['.js','.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'moush-Vue',
      template:'./config/indexTemplate.html'
    }),
  ]
};

// module.exports = {
//   entry: './build/index.js',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//   },
//   mode:"development",
//   // module: {
//   //   rules: [
//   //     { test: /\.ts$/, use: 'ts-loader' },
//   //   ],
//   // },
//   // extensions: ['.js','.ts'],
// };