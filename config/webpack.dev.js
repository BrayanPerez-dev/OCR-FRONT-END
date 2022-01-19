const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin")

const devConfig = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    historyApiFallback: true,
    compress: true,
    port: 8081,
    open: true,
    hot: true,
  },
  target: "web",
  module :{
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(), 
    new ReactRefreshWebpackPlugin(), 
    new CopyPlugin({
    patterns: [
      { from: "node_modules/@microblink/blinkid-in-browser-sdk/resources" },
    ],
  }),],
  devtool: "eval-source-map",
};
module.exports = merge(common, devConfig);
