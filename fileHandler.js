const csv = require('csv-parser');
const fs = require('fs');

const fileHandler = {
    startReading(filePath, hospitalName, datatype, callbackConverter, callbackHandleData) {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                console.log(row);
                let converted = callbackConverter(row, hospitalName, datatype);
                callbackHandleData(converted);
            })
            .on('end', () => {
                console.log(`"${filePath}" file successfully processed`);
            });
    }

}

module.exports = fileHandler;