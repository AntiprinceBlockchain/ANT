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

module.exports = function(grunt) {
	var maxBufferSize = require('buffer').kMaxLength - 1;

	grunt.initConfig({
		exec: {
			mocha: {
				cmd: function(tag, suite, section) {
					if (suite === 'integration') {
						var slowTag = '';
						if (tag !== 'slow') {
							slowTag = '--grep @slow --invert';
						}
						return `./node_modules/.bin/_mocha --bail test/integration/index.js ${slowTag}`;
					} else {
						var toExecute = [tag, suite, section]
							.filter(function(val) {
								return val;
							})
							.join(' ');
						return `node test/common/parallel_tests.js ${toExecute}`;
					}
				},
				maxBuffer: maxBufferSize,
			},

			fetchCoverage: {
				command:
					'rm -rf ./test/.coverage-func.zip; curl -o ./test/.coverage-func.zip $HOST/coverage/download',
				maxBuffer: maxBufferSize,
			},

			coverageReport: {
				command:
					'rm -f ./test/.coverage-unit/lcov.info; ./node_modules/.bin/istanbul report --root ./test/.coverage-unit/ --dir ./test/.coverage-unit',
			},
		},

		eslint: {
			options: {
				configFile: '.eslintrc.json',
				format: 'codeframe',
				fix: false,
			},
			target: '.',
		},
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-eslint');

	grunt.registerTask('coverageReport', ['exec:coverageReport']);
	grunt.registerTask('default', 'mocha');
};
