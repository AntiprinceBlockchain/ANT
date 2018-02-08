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

const DBSandbox = require('../../../common/db_sandbox').DBSandbox;
const PGPromiseStub = require('../stubs');

let db;
let stubs;
let dbSandbox;

describe('delegates', () => {
	before(done => {
		dbSandbox = new DBSandbox(
			__testContext.config.db,
			'lisk_test_db_delegates'
		);
		dbSandbox.create((err, __db) => {
			db = __db;
			stubs = new PGPromiseStub(db);
			done(err);
		});
	});
	after(() => {
		dbSandbox.destroy();
	});

	describe('insertFork', () => {
		describe('something', () => {
			it('-------', () => {
				stubs.intercept('delegates.insertFork', []).then(result => {
					expect(result.startsWith('INSERT INTO forks_stat')).to.equal(true);
				});
			});
		});
	});
	/*
        describe('getDelegatesByPublicKeys', () => {
            let data, err;
            beforeEach(done => {
                stubs.execute('delegates.getDelegatesByPublicKeys', [])
                    .then(d => {
                        data = d;
                    })
                    .catch(e => {
                        err = e;
                    })
                    .finally(() => done());
            });
            describe('something', () => {
                it('-------', () => {
                    expect(err).to.equal(true);
                });
            });
        });
    */
});
