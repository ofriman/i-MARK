const number = +process.argv[2];
const s = process.argv[3];
const d = process.argv[4];
const table = require("./imark.js")
  .calc(number,
    s.split(",").map(s => +s),
    d.split(",").map(d => +d)
  );
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
  header: ['n', 'g(n)'],
  path: `i-MARK${s}_${d}.csv`
});
csvWriter.writeRecords(table.map((grundy, index) => [index, grundy]))
  .then(() => {
    console.log('saved!');
  });
