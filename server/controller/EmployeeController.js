const Employee = require('../model/employee');

// const { PutObjectCommand } = require("@aws-sdk/client-s3");
// const { s3Client, s3Delete } = require("../aws/aws_sdk.js");

// function isImage(fileType) {
//     // Define an array of image MIME types
//     const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

//     // Check if the fileType is in the imageMimeTypes array
//     return imageMimeTypes.includes(fileType);
// }

// function isPDF(fileType) {
//     // Define an array of image MIME types
//     const pdfMimeTypes = ['application/pdf'];

//     // Check if the fileType is in the imageMimeTypes array
//     return pdfMimeTypes.includes(fileType);
// }


// function isWord(fileType) {
//     // Define an array of image MIME types
//     const wordMimeTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

//     // Check if the fileType is in the imageMimeTypes array
//     return wordMimeTypes.includes(fileType);
// }

// function isExcel(fileType) {
//     // Define an array of image MIME types
//     const excelMimeTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

//     // Check if the fileType is in the imageMimeTypes array
//     return excelMimeTypes.includes(fileType);
// }

exports.searchEmployee = async (req, res) => {
    try {
        let all_datas;
        if (req.body.multiple) {
            all_datas = Employee.find(req.body.query)
                .then((results) => {
                    console.log(results);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            all_datas = Employee.findOne(req.body.query)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

//employee controllers
exports.employeeInfo = async (req, res) => {
    try {
        const all_datas = await Employee.find();
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.employeeUpload = async (req, res, next) => {
    // let { name, motherName, fatherName, address, phNo, nrcNo, religion, gender, passport, dob, dobString, dobUpdate, age, weight, height, marital, education, experience, workedCountry, spokenLanguage, agent, deposit, applyDate, passportExpireDate, passportType, medicalOnlineExpire, airPlaneNo, departureDate, smartCardNo, passportScan, nrcScan, vaccineNotaryScan, medicalOnlineScan, trainingScan, airTicketScan, visaScan, smartCardScan, familyDataScan } = req.body;

    let { name, passportNo, passportType, fatherName, motherName } = req.body;

    // const bucketName = 'shanpyaephyo';

    // const passportData = passportScan.data;
    // const nrcData = nrcScan.data;
    // const vaccineNotaryData = vaccineNotaryScan.data;
    // const medicalOnlineData = medicalOnlineScan.data;
    // const trainingData = trainingScan.data;
    // const airTicketData = airTicketScan.data;
    // const visaData = visaScan.data;
    // const smartCardData = smartCardScan.data;
    // const familyDataData = familyDataScan.data;

    // const passportObjectKey = `passport/${passportScan.filename}`
    // const nrcObjectKey = `nrc/${nrcScan.filename}`
    // const vaccineNotaryObjectKey = `vaccineNotary/${vaccineNotaryScan.filename}`
    // const medicalOnlineObjectKey = `medicalOnline/${medicalOnlineScan.filename}`
    // const trainingObjectKey = `training/${trainingScan.filename}`
    // const airTicketObjectKey = `airTicket/${airTicketScan.filename}`
    // const visaObjectKey = `visa/${visaScan.filename}`
    // const smartCardObjectKey = `smartCard/${smartCardScan.filename}`
    // const familyDataObjectKey = `familyData/${familyDataScan.filename}`

    // Upload Data string to S3 bucket
    // const uploadToS3 = async (DataString, fileType, bucketName, objectKey) => {
    //     const isImageFile = isImage(fileType);
    //     const isPDFFile = isPDF(fileType);
    //     const isWordFile = isWord(fileType);
    //     const isExcelFile = isExcel(fileType);

    //     if (isImageFile) {
    //         const Data = DataString.replace(/^data:image\/\w+;base64,/, '');
    //         const binaryData = Buffer.from(Data, 'base64');

    //         const params = {
    //             Bucket: bucketName,
    //             Key: objectKey,
    //             Body: binaryData,
    //             ContentType: fileType,
    //         };

    //         const command = new PutObjectCommand(params);

    //         try {
    //             const response = await s3Client.send(command);

    //             console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
    //         } catch (error) {
    //             console.error('An error occurred while uploading to S3:', error);
    //         }
    //     }
    //     if (isPDFFile) {
    //         const Data = DataString.replace(/^data:application\/pdf;base64,/, '');
    //         const binaryData = Buffer.from(Data, 'base64');

    //         const params = {
    //             Bucket: bucketName,
    //             Key: objectKey,
    //             Body: binaryData,
    //             ContentType: 'application/pdf',
    //         };

    //         const command = new PutObjectCommand(params);

    //         try {
    //             const response = await s3Client.send(command);
    //             console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
    //         } catch (error) {
    //             console.error('An error occurred while uploading to S3:', error);
    //         }
    //     }
    //     if (isWordFile) {
    //         const prefix = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,";
    //         const Data = DataString.slice(prefix.length);
    //         const binaryData = Buffer.from(Data, 'base64');

    //         const params = {
    //             Bucket: bucketName,
    //             Key: objectKey,
    //             Body: binaryData,
    //             ContentType: 'application/msword',
    //         };

    //         const command = new PutObjectCommand(params);

    //         try {
    //             const response = await s3Client.send(command);
    //             console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
    //         } catch (error) {
    //             console.error('An error occurred while uploading to S3:', error);
    //         }
    //     }
    //     if (isExcelFile) {
    //         const prefix1 = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
    //         const prefix2 = "data:application/vnd.ms-excel;base64,";
    //         let Data = "";

    //         if (DataString.startsWith(prefix1)) {
    //             Data = DataString.slice(prefix1.length);
    //         } else if (DataString.startsWith(prefix2)) {
    //             Data = DataString.slice(prefix2.length);
    //         }

    //         const binaryData = Buffer.from(Data, 'base64');

    //         const params = {
    //             Bucket: bucketName,
    //             Key: objectKey,
    //             Body: binaryData,
    //             ContentType: 'application/vnd.ms-excel',
    //         };

    //         const command = new PutObjectCommand(params);

    //         try {
    //             const response = await s3Client.send(command);
    //             console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
    //         } catch (error) {
    //             console.error('An error occurred while uploading to S3:', error);
    //         }
    //     }
    // };

    // Generate S3 URL
    // const generateS3Url = (bucketName, objectKey) => {
    //     const region = 'ap-south-1';
    //     return `https://${bucketName}.s3.${region}.amazonaws.com/${objectKey}`;
    // };

    // uploadToS3(passportData, passportScan.contentType, bucketName, passportObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // const passportScanData = {
    //     filename: passportScan.filename,
    //     contentType: passportScan.contentType,
    //     s3URL: generateS3Url(bucketName, passportObjectKey)
    // }


    // uploadToS3(nrcData, nrcScan.contentType, bucketName, nrcObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let nrcScanData = {
    //     filename: nrcScan.filename,
    //     contentType: nrcScan.contentType,
    //     s3URL: generateS3Url(bucketName, nrcObjectKey)
    // }

    // uploadToS3(vaccineNotaryData, vaccineNotaryScan.contentType, bucketName, vaccineNotaryObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let vaccineNotaryScanData = {
    //     filename: vaccineNotaryScan.filename,
    //     contentType: vaccineNotaryScan.contentType,
    //     s3URL: generateS3Url(bucketName, vaccineNotaryObjectKey)
    // }

    // uploadToS3(medicalOnlineData, medicalOnlineScan.contentType, bucketName, medicalOnlineObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let medicalOnlineScanData = {
    //     filename: medicalOnlineScan.filename,
    //     contentType: medicalOnlineScan.contentType,
    //     s3URL: generateS3Url(bucketName, medicalOnlineObjectKey)
    // }

    // uploadToS3(trainingData, trainingScan.contentType, bucketName, trainingObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let trainingScanData = {
    //     filename: trainingScan.filename,
    //     contentType: trainingScan.contentType,
    //     s3URL: generateS3Url(bucketName, trainingObjectKey)
    // }

    // uploadToS3(visaData, visaScan.contentType, bucketName, visaObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let visaScanData = {
    //     filename: visaScan.filename,
    //     contentType: visaScan.contentType,
    //     s3URL: generateS3Url(bucketName, visaObjectKey)
    // }

    // uploadToS3(smartCardData, smartCardScan.contentType, bucketName, smartCardObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let smartCardScanData = {
    //     filename: smartCardScan.filename,
    //     contentType: smartCardScan.contentType,
    //     s3URL: generateS3Url(bucketName, smartCardObjectKey)
    // }

    // uploadToS3(airTicketData, airTicketScan.contentType, bucketName, airTicketObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let airTicketScanData = {
    //     filename: airTicketScan.filename,
    //     contentType: airTicketScan.contentType,
    //     s3URL: generateS3Url(bucketName, airTicketObjectKey)
    // }

    // uploadToS3(familyDataData, familyDataScan.contentType, bucketName, familyDataObjectKey)
    //     .catch((error) => {
    //         console.error('An error occurred:', error);
    //     });
    // let familyDataScanData = {
    //     filename: familyDataScan.filename,
    //     contentType: familyDataScan.contentType,
    //     s3URL: generateS3Url(bucketName, familyDataObjectKey)
    // }

    // format DOB String
    // let date = new Date(dob);
    // let newDate = new Date(dob);
    // let anotherDate = new Date(dob);

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // day = (day < 10 ? "0" : "") + day;
    // month = (month < 10 ? "0" : "") + month;
    // dobString = day + "." + month + "." + year;

    // format DOB
    // const anotherYear = anotherDate.getFullYear();
    // const anotherMonth = (anotherDate.getMonth() + 1).toString().padStart(2, '0');
    // const anotherDay = anotherDate.getDate().toString().padStart(2, '0');
    // dobUpdate = anotherYear + "-" + anotherMonth + "-" + anotherDay;

    // age calculate
    // let today = new Date();
    // let calAge = today.getFullYear() - newDate.getFullYear();
    // let monthDiff = today.getMonth() - newDate.getMonth();

    // if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < newDate.getDate())) {
    //     calAge--;
    // }

    // age = calAge;

    // const newEmployee = new Employee({ name, motherName, fatherName, address, phNo, nrcNo, religion, gender, passport, dob, dobString, dobUpdate, age, weight, height, marital, education, experience, workedCountry, spokenLanguage, agent, passportScanData, nrcScanData, vaccineNotaryScanData, medicalOnlineScanData, trainingScanData, airTicketScanData, visaScanData, smartCardScanData, familyDataScanData, deposit, applyDate, passportExpireDate, passportType, medicalOnlineExpire, smartCardNo, airPlaneNo, departureDate });

    const newEmployee = new Employee({ name, passportNo, passportType, fatherName, motherName });

    await newEmployee
        .save()
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            if (error.code === 11000) {
                // Duplicate key error
                res.status(400).json({
                    message: 'Passport number already exists. Please use a different passport number.'
                });
            } else {
                // Other errors
                res.status(500).json({
                    message: 'An error occurred while creating the employee',
                    error: error.message
                });
            }
        })
}

exports.employeeModify = async (req, res) => {
    try {
        const { idNo } = req.body;
        const all_datas = await Employee.findById({ _id: idNo });
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.employeeModifyRequest = async (req, res) => {
    try {
        const data = req.body;
        const all_datas = await Employee.findById({ _id: data._id });
        Object.assign(all_datas, data);
        const updatedEmployee = await all_datas.save();
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.employeeDelete = async (req, res) => {
    try {
        const { idNo } = req.body;
        const all_datas = await Employee.findById({ _id: idNo });
        // console.log(all_datas.demandLetterScanData.filename);
        const bucketName = 'shanpyaephyo';

        const passportObjectKey = `passport/${all_datas.passportScanData.filename}`
        const nrcObjectKey = `nrc/${all_datas.nrcScanData.filename}`
        const vaccineNotaryObjectKey = `vaccineNotary/${all_datas.vaccineNotaryScanData.filename}`
        const medicalOnlineObjectKey = `medicalOnline/${all_datas.medicalOnlineScanData.filename}`
        const trainingObjectKey = `training/${all_datas.trainingScanData.filename}`
        const airTicketObjectKey = `airTicket/${all_datas.airTicketScanData.filename}`
        const visaObjectKey = `visa/${all_datas.visaScanData.filename}`
        const smartCardObjectKey = `smartCard/${all_datas.smartCardScanData.filename}`
        const familyDataObjectKey = `familyData/${all_datas.familyDataScanData.filename}`

        s3Delete(bucketName, passportObjectKey);
        s3Delete(bucketName, nrcObjectKey);
        s3Delete(bucketName, vaccineNotaryObjectKey);
        s3Delete(bucketName, medicalOnlineObjectKey);
        s3Delete(bucketName, trainingObjectKey);
        s3Delete(bucketName, airTicketObjectKey);
        s3Delete(bucketName, visaObjectKey);
        s3Delete(bucketName, smartCardObjectKey);
        s3Delete(bucketName, familyDataObjectKey);

        await Employee.deleteOne({ _id: idNo });
        res.sendStatus(200);
        console.log('it work');
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.employeeSingleInfo = async (req, res) => {
    try {
        const { idNo } = req.body;
        const all_datas = await Employee.findById({ _id: idNo });
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

