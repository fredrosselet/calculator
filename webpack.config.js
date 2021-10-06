const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js.|jsx)$/,
      exclude: /node_modules/
    }]
  },

  plugins: [
    new Dotenv()
  ]
};