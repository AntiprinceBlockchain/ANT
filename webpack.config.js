/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */
'use strict';

var path = require('path');
var nodeExternals = require('webpack-node-externals');
var MakeDirWebpackPlugin = require('make-dir-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ArchivePlugin = require('webpack-archive-plugin');
var GenerateAssetPlugin = require('generate-asset-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');

var moment = require('moment');
var today = moment().format('HH:mm:ss DD/MM/YYYY');
var config = require('./config.json');
var release_dir = `${__dirname}/release/`;
var version_dir = release_dir + config.version;

module.exports = {
	context: path.join(__dirname),
	entry: {
		app: './app.js',
		workers_controller: './workers_controller.js',
	},
	output: {
		path: version_dir,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	target: 'node',
	node: {
		__dirname: true,
	},
	externals: [nodeExternals()],
	plugins: [
		new CleanWebpackPlugin([version_dir]),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerMode: 'static',
			statsOptions: { source: false },
		}),
		new GenerateAssetPlugin({
			filename: './build',
			fn: (compilation, cb) => {
				cb(null, `v${today}`);
			},
		}),
		new CopyWebpackPlugin([
			{ from: './config.json' },
			{ from: './genesis_block.json' },
			{ from: './LICENSE' },
			{ from: './package.json' },
			{ from: './db/sql/**/*.sql' },
			{ from: './schema/*.yml' },
			{ from: './config/**/*.yml' },
		]),
		new MakeDirWebpackPlugin({
			dirs: [{ path: `${version_dir}/logs` }, { path: `${version_dir}/pids` }],
		}),
		new ArchivePlugin({
			format: 'tar',
			extension: 'tar.gz',
		}),
	],
};
