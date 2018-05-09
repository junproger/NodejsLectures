const fs = require("fs");
const path = require("path");

function handleError(err) {
    console.error(err);
}

fs.readFile(path.resolve(__dirname, "fileA"), "utf-8", (err1, data1) => {
    if (err1) return handleError(err1);
    fs.readFile(path.resolve(__dirname, "fileB"), "utf-8", (err2, data2) => {
        if (err2) return handleError(err2);
        fs.writeFile(path.resolve(__dirname, "fileA_fileB"), data1 + data2, "utf-8", (err3) => {
            if (err3) return handleError(err3);
            console.log("Created fileA_fileB");
        });
    });
});