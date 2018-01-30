/**
 * @namespace api/controllers
 */

module.exports = {
	accounts: require('./accounts'),
	blocks: require('./blocks'),
	dapps: require('./dapps'),
	delegates: require('./delegates'),
	migrations: require('./migrations'),
	multisignatures: require('./multisignatures'),
	peers: require('./peers'),
	rounds: require('./rounds'),
	'transactions.dapp': require('./transactions.dapp'),
	'transactions.delegate': require('./transactions.delegate'),
	'transactions.in_transfer': require('./transactions.in_transfer'),
	transactions: require('./transactions'),
	'transactions.multisignature': require('./transactions.multisignature'),
	'transactions.out_transfer': require('./transactions.out_transfer'),
	'transactions.signature': require('./transactions.signature'),
	'transactions.transfer': require('./transactions.transfer'),
	'transactions.vote': require('./transactions.vote'),
	voters: require('./voters'),
	votes: require('./votes'),
};
