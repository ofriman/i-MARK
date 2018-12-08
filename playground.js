const number = process.argv[2];
const s = process.argv[3];
const d = process.argv[4];

require("./helper.js")({
  number,
  s,
  d,
  csvWriterOptions: {
    header: ['n', 'g(n)'],
    path: `i-MARK${s}_${d}.${number}.csv`
  },
  processing: table => table.map((grundy, index) => [index, grundy])
});
