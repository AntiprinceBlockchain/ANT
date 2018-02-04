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

const Promise = require('bluebird');

class PGPromiseStub {
	constructor(db) {
		this.db = db;
	}

	intercept(method, params) {
		return new Promise((resolve, reject) => {
			const opt = this.db.$config.options;
			const oldQuery = opt.query;
			let q;
			opt.query = e => {
				q = e.query;
				throw null;
			};
			method(...params)
				.then(data => {
					throw new Error(
						`Method resolved without trying to execute any query, with data: ${JSON.stringify(
							data
						)}`
					);
				})
				.catch(error => {
					if (error === null) {
						resolve(q);
					} else {
						reject(error);
					}
				})
				.finally(() => {
					opt.query = oldQuery;
				});
		});
	}

	execute(method, params) {
		return new Promise((resolve, reject) => {
			const opt = this.db.$config.options;
			const oldQuery = opt.query;
			let q;
			opt.query = e => {
				q = e.query;
			};
			method(...params)
				.then(data => {
					throw new Error(
						`Method resolved without trying to execute any query, with data: ${JSON.stringify(
							data
						)}`
					);
				})
				.catch(error => {
					if (error === null) {
						resolve(q);
					} else {
						reject(error);
					}
				})
				.finally(() => {
					opt.query = oldQuery;
				});
		});
	}
}

module.exports = PGPromiseStub;
