const fileHandler = require("./fileHandler");
const dataConverter = require("./converter");
var path = require('path');

const PATIENT_TYPE = 0;
const TREATMENT_TYPE = 1;

const importHospitalsData = async function () {

    // start reading from patients files
    await importData([["h1","hospital_1_Patient.csv"], ["h2", "hospital_2_Patient.csv"]], PATIENT_TYPE, "patients.csv");


    // start reading from treatments files
    //await importData([["h1", "hospital_1_Treatment.csv"], ["h2", "hospital_2_Treatment.csv"]], TREATMENT_TYPE, "treatments.csv");
}

const importData = async function (filesPaths, dataType, writeFilePath) {

    filesPaths.forEach(async filePath => {

        await fileHandler.startReading(path.join(__dirname, filePath[1]),
            filePath[0], // hospital name
            dataType,
            dataConverter.convertToSystemDataType,
            convertedData => {
                console.log(convertedData);
                // save Data to file
            });
    });


}

importHospitalsData();