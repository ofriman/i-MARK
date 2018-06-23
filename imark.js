const mex = array => array
	.sort((a, b) => a - b)
	.reduce((mex, value) => mex < value ? mex : (value + 1) ,0);

const options = (n,s, d) => s.filter(s_num => n >= s_num).map(s_num => n - s_num)
	.concat(d.filter(d_num => n && n % d_num === 0).map(d_num => n / d_num))
	.filter((item, pos, a) => a.indexOf(item) == pos);

const calc = (n, s, d) => {
  const table = [];

  for (let i = table.length; i <= n; i += 1) {
    table[i] = mex(options(i, s, d).map(number => table[number]));
  }

  return table;
};

module.exports = {mex, options, calc};