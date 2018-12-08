const imark = require("./imark.js");
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
module.exports = ({
  number,
  s,
  d,
  csvWriterOptions,
  processing
}) => {
  createCsvWriter(csvWriterOptions)
    .writeRecords(
      processing(
        imark.calc(+number,
          s.split(",").map(s => +s),
          d.split(",").map(d => +d)
        )))
    .then(() => {
      console.log('saved!');
    });
}
