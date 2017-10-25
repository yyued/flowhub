'use strict';

const path = require('path');
const webpack = require('webpack');

const util = require('./util');
const packageJSON = require('../package.json');

const banner = `
${ packageJSON.name }

@file: [file]
@author: ${ packageJSON.author }
@version: ${ packageJSON.version }
@update: ${ ( new Date() ).format('YYYY-MM-DD hh:mm:ss') }

(c) 2017 YY UEDC
Released under the MIT License.
`;

const configuration = {
    entry: {
        'index': './src/index.js',
    },
    output: {
        path: path.resolve( __dirname, '../dist' ),
        filename: 'hub.min.js',
        libraryTarget: 'umd',
        // global window object name
        library: '$hub',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    plugins: [ 'babel-plugin-transform-runtime' ],
                    presets: [
                        ['env', {
                            targets: {
                                browsers: [
                                    'last 2 versions',
                                    'safari >= 8',
                                ],
                            }
                        }],
                        'stage-0',
                    ],
                },
                exclude: [
                    path.resolve(__dirname, '../node_modules'),
                ],
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unused: false,
            },
            output: {
                comments: false,
            },
            mangle: {
                except: ['$'],
            },
            minimize : true,
            sourceMap: false,
        }),
        new webpack.BannerPlugin({
            banner: banner.replace(/^\s+|\s+$/g, ''),
        }),
    ],
}

webpack( configuration, ( err, stats ) => {
    if ( err ) throw err;
    console.log( '[build success]' );
});
