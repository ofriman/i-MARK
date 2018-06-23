 var mocha = require('mocha')
var describe = mocha.describe
var chai = require("chai");
var assert = chai.assert;

const mex = array => array
	.sort((a, b) => a - b)
	.reduce((mex, value) => mex < value ? mex : (value + 1) ,0);

describe('mex', function() {
	it('empty array', function() {
		assert.equal(mex([]), 0);
	});

	it('not empty array', function() {
		assert.equal(mex([1]), 0);
		assert.equal(mex([3, 1]), 0);
		assert.equal(mex([1, 3]), 0);
		assert.equal(mex([0,2,3]), 1);
		assert.equal(mex([2,0,3]), 1);
		assert.equal(mex([3,2,0]), 1);
		assert.equal(mex([0, 1, 2]), 3);
		assert.equal(mex([2, 0, 1]), 3);
	});
});

const options = (n,s, d) => s.filter(s_num => n >= s_num).map(s_num => n - s_num)
	.concat(d.filter(d_num => n && n % d_num === 0).map(d_num => n / d_num))
	.filter((item, pos, a) => a.indexOf(item) == pos);

describe('options', function() {
	it('empty sets', function() {
		assert.deepEqual(options(10, [], []), []);
	});

	it('not empty sets', function() {
		assert.deepEqual(options(10, [1], [2]), [9, 5]);
		assert.deepEqual(options(9,  [1], [2]), [8]);
		assert.deepEqual(options(8,  [1], [2]), [7, 4]);
		assert.deepEqual(options(7,  [1], [2]), [6]);
		assert.deepEqual(options(6,  [1], [2]), [5, 3]);
		assert.deepEqual(options(5,  [1], [2]), [4]);
		assert.deepEqual(options(4,  [1], [2]), [3, 2]);
		assert.deepEqual(options(3,  [1], [2]), [2]);
		assert.deepEqual(options(2,  [1], [2]), [1]);
		assert.deepEqual(options(1,  [1], [2]), [0]);
		assert.deepEqual(options(0,  [1], [2]), []);

		assert.deepEqual(options(10, [1], [3, 2]), [9, 5]);
		assert.deepEqual(options(9,  [1], [3, 2]), [8, 3]);
		assert.deepEqual(options(8,  [1], [3, 2]), [7, 4]);
		assert.deepEqual(options(7,  [1], [3, 2]), [6]);
		assert.deepEqual(options(6,  [1], [3, 2]), [5, 2, 3]);
		assert.deepEqual(options(5,  [1], [3, 2]), [4]);
		assert.deepEqual(options(4,  [1], [3, 2]), [3, 2]);
		assert.deepEqual(options(3,  [1], [3, 2]), [2, 1]);
		assert.deepEqual(options(2,  [1], [3, 2]), [1]);
		assert.deepEqual(options(1,  [1], [3, 2]), [0]);
		assert.deepEqual(options(0,  [1], [3, 2]), []);
	});
});

const imark = (n, s, d) => {
  const table = [];

  for (let i = table.length; i <= n; i += 1) {
    table[i] = mex(options(i, s, d).map(number => table[number]));
  }

  return table;
};

describe('imark', function() {
	it('no move game', function() {
		assert.deepEqual(imark(0, [1], [2]), [0]);
		assert.deepEqual(imark(1, [3], []), [0, 0]);
		assert.deepEqual(imark(2, [], [3]), [0, 0, 0]);
		assert.deepEqual(imark(3, [], []), [0, 0, 0, 0]);
	});

	it('first 31 number in imark({1}, {2})', function() {
		assert.deepEqual(imark(31, [1], [2]), [0, 1, 0, 1, 2, 0, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0]);
	});
});

module.exports = imark;