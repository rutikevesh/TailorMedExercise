const convertionsDictionary = require("./convertionDictionary");

let dict = new convertionsDictionary();

const PATIENT_TYPE = 0;
const TREATMENT_TYPE = 1;

const convertToSystemDataType = function (objectToConvert, hospitalName, dataType) {

    let convertedObject = {};

    let hospitalConvertions = dataType === PATIENT_TYPE ?
        dict.patientConvertions[hospitalName]
        : dict.treatmentConvertions[hospitalName];

    Object.entries(hospitalConvertions.columns).forEach(systemColumn => {
        let hospitalCurrentValue;

        if (systemColumn[1] === "") {
            hospitalCurrentValue = hospitalConvertions.formats["empty"];
        } else {

            hospitalCurrentValue = objectToConvert[systemColumn[1]];
        }

        convertedObject[systemColumn[0]] = convertFormat(hospitalConvertions.formats, hospitalCurrentValue, systemColumn[0]);
    })

    return convertedObject;
}

// convert value from hospital format to system format
const convertFormat = function (currentFormat, originalValue, systemColumn) {

    let converted;

    if (originalValue === currentFormat["empty"]) {
        converted = "";
    }
    else {
        // take care of regular expresions
        if(!dict.systemFormatsType.has(currentFormat)){
            
            originalValue = applyRegExp(currentFormat, originalValue);
        }

        // convert how to save data in system file
        let systemFormat = dict.systemDataFormats[systemColumn];

        if (systemFormat) {

            switch (systemFormat) {
                case "String": converted = originalValue; break;
                case "Boolean": converted = currentFormat[systemColumn][originalValue]; break;
                case "DateTime": {
                    converted = originalValue; break;
                }
                case "Struct": converted = currentFormat[systemColumn][originalValue]; break;
                default: break;
            }
        }

    }

    return converted;
}

const applyRegExp = function(regExp, valueToApplyOn){
    return "string"; // should apply regExp
}

module.exports = { convertToSystemDataType };