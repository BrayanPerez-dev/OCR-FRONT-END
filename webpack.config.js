/* eslint-disable linebreak-style */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output:
    {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js',
    },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/@microblink/blinkid-in-browser-sdk/resources' },
      ],
    }),
    new EsLintPlugin(),
  ],
  devtool: 'eval-source-map',

};
