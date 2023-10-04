const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './js/InstagramApi.js',
    './js/facebookApi.js',
    './js/masonry.pkgd.min.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js/'),
  },
};