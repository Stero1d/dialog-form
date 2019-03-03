const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.png$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve("file-loader"),
        options: {
            name: "/static/media/[name].[hash:8].[ext]",
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: './src/model/',
        to: 'model'
      }
    ])
  ]
};