const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",

  entry: "./src/index.js", // adjust if your entry is elsewhere

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
    publicPath: "/", // important for React Router
  },

  target: "web",

  devtool: isProduction ? false : "eval-source-map",

  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
    historyApiFallback: true, // for React Router
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // must exist
      minify: isProduction
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
          }
        : false,
    }),
    new CleanWebpackPlugin(),
  ],
};
