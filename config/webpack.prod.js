const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const prodConfig = {
  mode: "production",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CaseSensitivePathsPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim:true,
      exclude: [/\.map$/, /asset-mainifest\.json$/],
      navigateFallback: paths.publicUrlOrPath + 'index.html',
      navigateFallbackDenylist:[
        new RegExp('^/_'),
        new RegExp('/[^/?]+\\.[^/]+$'),
      ]
    })
  ],
};
module.exports = merge(common, prodConfig);
