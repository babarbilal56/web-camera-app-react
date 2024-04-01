const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "/src/main.tsx",
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.min.css'],
  },
  output: {
    filename: "main.js",
    publicPath: '/',

  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:{
              presets: ["@babel/preset-env", ["@babel/preset-react",{
                "runtime": "automatic"
              }]],
            }
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: "./images",
            to: "./images"
          },
          {
            from: "./src/index.html",
            to: "./"
          },
        ]
      }
    )
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist"
  }
};
