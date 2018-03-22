#!/usr/bin/env node

'use strict';

const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra');

const util = require('./util');
const packageJSON = require('../package.json');

const distFileName = 'hub.min.js';

const banner = `
hub.js v${ packageJSON.version }
(c) 2018 YY UEDC
Released under the MIT License.
`;

const configuration = {
    entry: {
        'index': './src/index.js',
    },
    output: {
        path: path.resolve( __dirname, '../dist' ),
        filename: distFileName,
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

const distFile = path.resolve( __dirname, `../dist/${ distFileName }` );
const testFolder = path.resolve( __dirname, `../__test__` );
const testFile = `${ testFolder }/src/assets/${ distFileName }`;

webpack( configuration, ( err, stats ) => {
    if ( err ) throw err;

    const success = ( ) => {
        console.info( '[build success]' );
    }

    if ( fs.existsSync( testFolder ) ) {
        fs.copy( distFile, testFile ).then(() => {
            success();
        })
    }
    else {
        success();
    }
});
