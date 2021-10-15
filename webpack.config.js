const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    // directory: path.join(__dirname, "build"),
    port: 9090,
    compress:true,
    open:true
  }, 
  mode: "development",
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "moush-Vue",
      template: "./config/indexTemplate.html",
    }),
  ],
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
