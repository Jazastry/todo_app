const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const paths = require('./paths.js');

module.exports = {
    entry: ["babel-polyfill", path.resolve(paths.root, paths.entryJs)],
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'Irfan',
            // inlineSource: '.(js|css)$',
            template: path.resolve(paths.root, paths.entryHtml),
            favicon: path.resolve(paths.root, paths.favicon)
        }),
        // new HtmlWebpackInlineSourcePlugin()
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
            }, {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    // 'css-loader'
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[sha512:hash:base32]-[name]-[local]',
                            modules: true,
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'css-loader',
                    options: {
                        localIdentName: '[sha512:hash:base32]-[name]-[local]',
                        modules: true,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'sass-loader',
                    options: {
                        // includePaths: paths.sass,
                        sourceMap: true
                    }
                }]
                // use: [{
                //     loader: "style-loader" // creates style nodes from JS strings
                // }, {
                //     loader: "css-loader" // translates CSS into CommonJS
                // }, {
                //     loader: "sass-loader", // compiles Sass to CSS - https://github.com/sass/node-sass
                //     options: {
                //         outputStyle: "nested" //options - nested, expanded, compact, compressed
                //     }
                // }]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]'
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
