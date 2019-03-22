const path = require('path');
const webpack = require('webpack');

const gmKey = process.argv[3].slice(2).trim();

if (!gmKey || gmKey === '') {
  console.error('provide .gmkey file with google maps api key');
  process.exit();
}

module.exports = {
  entry: './src/script/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /(script)\/.*(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API: {
        GM: JSON.stringify(gmKey),
      },
    }),
  ],
};
