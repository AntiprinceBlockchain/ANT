## Tests for Database Repositories

Here in sub-folder [./repos](./repos) you can find tests for all database repositories, as implemented in [/db/repos](../../../db/repos).

Each repository is tested within a single JavScript file with the name matching that of the repository it tests.

### Test Stub

Module [./pgp_stub.js](./stubs.js) exports class `PGPromiseStub` to simplify testing the SQL being executed with its result side-by-side.

Example:

```js
const PGPromiseStub = require('../stubs');

const stubs = new PGPromiseStub(db); // Initialize with the Database object

/////////////////////////////////////////////////
// Test with intercepting the SQL from execution:

// Test method via reference:
stubs
	.intercept(db.accounts.insert, data)
	.then()
	.catch();

// Test method via name:
stubs
	.intercept('accounts.insert', data)
	.then()
	.catch();
```
