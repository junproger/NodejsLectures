const path = require("path");
const util = require("util");
const fs = require("fs");

console.log(util.format("Some string %s", "Some string 2"));

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function handleError(err) {
    console.error(err);
}

//1
readFileAsync(path.resolve(__dirname, "fileA"), "utf8")
    .then((data1) => {
        return readFileAsync(path.resolve(__dirname, "fileB"), "utf8")
            .then(data2 => {
                return writeFileAsync(path.resolve(__dirname, "fileA_fileB_Promise"), data1 + data2);
            });
    })
    .then(() => {
        console.log("Created fileA_fileB_Promise");
    })
    .catch(err => {
        console.log("Catching error");
        handleError(err);
    });


//2 Promise.all
/* Promise.all([
    readFileAsync(path.resolve(__dirname, "fileA")),
    readFileAsync(path.resolve(__dirname, "fileB"))
])
.then(dataArr => {
    //dataArr[0] - содержимое файла fileA
    //dataArr[1] - содержимое файла fileB
    return writeFileAsync(path.resolve(__dirname, "fileA_fileB_PromiseAll"), dataArr[0] + dataArr[1]);
})
.then(() => {
    console.log("Created fileA_fileB_PromiseAll");
})
.catch(err => {
    handleError(err);
}); */