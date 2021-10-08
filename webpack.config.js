const path = require('path');

// module.exports = {
//   entry: './index.ts',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//   },
//   mode:"development",
//   module: {
//     rules: [
//       { test: /\.ts$/, use: 'ts-loader' },
//     ],
//   },
//   // extensions: ['.js','.ts'],
// };

module.exports = {
  entry: './build/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode:"development",
  // module: {
  //   rules: [
  //     { test: /\.ts$/, use: 'ts-loader' },
  //   ],
  // },
  // extensions: ['.js','.ts'],
};