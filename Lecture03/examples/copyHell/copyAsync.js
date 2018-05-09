const path = require("path");
const util = require("util");
const fs = require("fs");

function handleError(err) {
    console.error(err);
}

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

readFileAsync(path.resolve(__dirname, "fileA"))
    .then(async (data1) => {
        let data2 = await readFileAsync(path.resolve(__dirname, "fileB"))
        await writeFileAsync(path.resolve(__dirname, "fileA_fileB_Async"), data1 + data2);
        console.log("Created fileA_fileB_Async");
    })
    .catch(err => {
        console.log("Catching error");
        handleError(err);
    });