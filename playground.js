console.log("n=" + process.argv[2]);
console.log("i-Mark({" + process.argv[3] + "}, {"+ process.argv[4] +"})");

const number = +process.argv[2];
const s = process.argv[3].split(",").map(s => +s);
const d = process.argv[4].split(",").map(d => +d);
const filename = process.argv[5];
const preIndexFilter = +process.argv[6] || 0;
const grundyFilter = +process.argv[7] || 0;

const table = require("./imark.js").calc(number, s, d);

if (filename) {
	if (filename.includes(".csv")) {
		const rowFormat = array => array.join(",") + "\n";
		const writeStream =  require('fs').createWriteStream(filename);
		writeStream.write(table.reduce((acc, value, index) => (acc + rowFormat([index, value])), rowFormat(["n", "g(K n)"])));
		writeStream.close();
		console.log(filename + " saved!");
	}
}