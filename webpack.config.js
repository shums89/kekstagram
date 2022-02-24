const path = require('path');

module.exports = {
  entry: './js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'bundle-js'),
  }
};
