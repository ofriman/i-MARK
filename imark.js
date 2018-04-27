const number = process.argv[2];
const s = process.argv[3];
const d = process.argv[4];
const file = process.argv[5];
const mex = array => array.sort((a, b) => a - b).reduce((mex, value) => mex < value ? mex : (value + 1) ,0);
const imark = (n, s, d) => {
  const table = [0];
  const s_neighbors = n => s.filter(s_num => n >= s_num).map(s_num => n - s_num);
  const d_neighbors = n => d.filter(d_num => ((n % d_num) === 0)).map(d_num => n / d_num);
  const sub = n => [...s_neighbors(n), ...d_neighbors(n)];
  for (let i = table.length; i <= n; i += 1)
    table[i] = mex(sub(i).map(number => table[number]));
  
  return table;
};
const table = imark(number, s.split(","), d.split(","));
const write_stream = require('fs').createWriteStream(file);
const row_format = array => array.join(",") + "\n";
write_stream.write(table.reduce((acc, value, index) => (acc + row_format([index, value])), row_format(["n", "g(K n)"])));
write_stream.close();