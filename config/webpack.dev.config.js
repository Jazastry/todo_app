const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths.js');

module.exports = {
  entry: ["babel-polyfill", path.resolve(paths.root, paths.entryJs)],
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([path.resolve(paths.root, paths.build)], {
      root: path.resolve(paths.root),
      allowExternal: true
    }),
    new HtmlWebpackPlugin({
      title: 'Irfan',
      template: path.resolve(paths.root, paths.entryHtml),
      favicon: path.resolve(paths.root, paths.favicon)
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(paths.root, 'build')
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(paths.root, paths.entryJs),
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.root, paths.src),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            localIdentName: '[sha512:hash:base32]-[name]-[local]',
            sourceMap: true
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: { sourceMap: true }
        }, {
          loader: 'css-loader',
          options: {
            localIdentName: '[sha512:hash:base32]-[name]-[local]',
            modules: true,
            sourceMap: true,
            exclude: path.resolve(paths.root, 'node_modules')
          }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: "file-loader?name=fonts/[name]-[hash].[ext]"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};
