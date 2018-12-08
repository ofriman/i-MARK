const number = process.argv[2];
const s = process.argv[3];
const d = process.argv[4];

require("./helper.js")({
  number,
  s,
  d,
  csvWriterOptions: {
    path: `i-MARK${s}_${d}.${number}.gap.csv`
  },
  processing: table => table
    .map((grundy, index) => [index, grundy])
    .reduce((acc, row) => {
      let sub = acc[row[1]] || [];
      sub.push([row[0], sub.length ? row[0] - sub.slice(-1)[0][0] : -1, row[0] % 6]);
      acc[row[1]] = sub;
      return acc;
    }, [])
    .map(row => {
      const ans = [];
      row.forEach(r => {
        ans[r[2]] = (ans[r[2]] || -1) > r[1] ? ans[r[2]] : r[1];
      });
      return ans;
    })
});
