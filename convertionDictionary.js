const PATIENT_CONVERTIONS_FILE_PATH = "./patientsConverts.csv"; // TODO:: create file and load data from it
const TREATMENT_CONVERTIONS_FILE_PATH = "./treatmentConverts.csv";


class convertionsDictionary{
    systemDataFormats = {
        patientId:"String",
        birthDate:"DateTime",
        isDeceased:"Boolean",
        deathDate:"DateTime",
        numberOfCycles:"String",
        daysInCycle:"String"   
    }

    systemFormatsType;
    patientConvertions;
    treatmentConvertions;

    constructor(){
        this.patientConvertions = this.getConvertionsFromFile(PATIENT_CONVERTIONS_FILE_PATH);
        this.treatmentConvertions = this.getConvertionsFromFile(TREATMENT_CONVERTIONS_FILE_PATH);

        this.systemFormatsType = new Set();
        this.systemFormatsType.add("String");
        this.systemFormatsType.add("DateTime");
        this.systemFormatsType.add("Boolean");
    }

    // should load from file
    getConvertionsFromFile(filePath){
        switch(filePath){
            case PATIENT_CONVERTIONS_FILE_PATH: return this.getPatients();
            case TREATMENT_CONVERTIONS_FILE_PATH: return this.getTreatments();
            default: break;
        }
    }

    getPatients(){
        let convertions = new Map();

        convertions["h1"] = {
            columns:{
                patientId:"PatientID",
                birthDate:"PatientDOB",
                isDeceased:"IsDeceased",
                deathDate:"DOD_TS"
            },
            formats:{
                patientId:"String",
                birthDate:"MM:DD:YYYY HH:MM:SS",
                isDeceased:{
                    "Deceased": true,
                    "Active": false,
                    "Hospice": false
                },
                deathDate:"MM:DD:YYYY HH:MM:SS",
                empty:""
            }
        }

        convertions["h2"] = {
            columns:{
                patientId:"PatientId",
                birthDate:"PatientDOB",
                isDeceased:"IsPatientDeceased",
                deathDate:"DeathDate"
            },
            formats:{
                patientId:"String",
                birthDate:"MM:DD:YYYY",
                isDeceased:{
                    "Y": true,
                    "N": false 
                },
                deathDate:"MM:DD:YYYY",
                empty: "NULL"
            }
        }

        return convertions;
    }

    getTreatments(){
        let convertions = new Map();

        convertions["h1"] = {
            columns:{
                patientId:"PatientID",
                numberOfCycles:"CyclesXDays",
                daysInCycle:"CyclesXDays"
            },
            formats:{
                patientId:"String",
                numberOfCycles:"[^X]*",
                daysInCycle:"[^X]*$",
                empty:""
            }
        }

        convertions["h2"] = {
            columns:{
                patientId:"PatientId",
                numberOfCycles:"NumberOfCycles",
                daysInCycle:""
            },
            formats:{
                patientId:"String",
                numberOfCycles:"String",
                daysInCycle:"-",
                empty: "NULL"
            }
        }

        return convertions;
    }
}

module.exports = convertionsDictionary;