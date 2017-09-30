const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const paths = require('./paths.js');

module.exports = {
    entry: path.resolve(paths.root, paths.entryJs),
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'Irfan',
            inlineSource: '.(js|css)$',
            template: path.resolve(paths.root, paths.entryHtml),
            favicon: path.resolve(paths.root, paths.favicon)
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(paths.root, paths.build)
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {}
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader", // compiles Sass to CSS - https://github.com/sass/node-sass
                        options: {
                            minimize: true //options - nested, expanded, compact, compressed
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader", // compiles Sass to CSS - https://github.com/sass/node-sass
                    options: {
                        outputStyle: "compressed" //options - nested, expanded, compact, compressed
                    }
                }]
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
