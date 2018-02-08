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

var _ = require('lodash');
require('../../helpers/transaction_types');

var columnSet;

/**
 * InTransfer Transactions database interaction class.
 *
 * @class
 * @memberof db.repos
 * @requires lodash
 * @requires helpers/transaction_types
 * @see Parent: {@link db.repos}
 * @param {Database} db - Instance of database object from pg-promise
 * @param {Object} pgp - pg-promise instance to utilize helpers
 * @returns {Object} - An instance of a InTransferTransactionsRepo
 */
function InTransferTransactionsRepo(db, pgp) {
	this.db = db;
	this.pgp = pgp;

	this.dbTable = 'intransfer';

	this.dbFields = ['dappId', 'transactionId'];

	if (!columnSet) {
		columnSet = {};
		var table = new pgp.helpers.TableName({
			table: this.dbTable,
			schema: 'public',
		});
		columnSet.insert = new pgp.helpers.ColumnSet(this.dbFields, {
			table,
		});
	}

	this.cs = columnSet;
}

/**
 * Save InTransfer transactions.
 *
 * @param {Array} transactions
 * @returns {Promise}
 * @todo Add descriptions for the params and the return value
 */
InTransferTransactionsRepo.prototype.save = function(transactions) {
	if (!_.isArray(transactions)) {
		transactions = [transactions];
	}

	transactions = transactions.map(transaction => ({
		dappId: transaction.asset.inTransfer.dappId,
		transactionId: transaction.id,
	}));

	return this.db.none(this.pgp.helpers.insert(transactions, this.cs.insert));
};

module.exports = InTransferTransactionsRepo;
