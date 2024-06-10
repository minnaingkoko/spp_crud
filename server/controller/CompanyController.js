const Company = require('../model/company');

//company controllers
exports.companyInfo = async (req, res) => {
    try {
        const all_datas = await Company.find();
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.companyUpload = async (req, res, next) => {
    let { companyName, companyAddress, postCode, demandMale, demandFemale, employees, companyPhNo, demandLetterScan, KSMScan, companyProfileScan, callingCopyScan, callingOrgScan, notaryScan } = req.body;

    const bucketName = 'shanpyaephyo';

    const demandLetterData = demandLetterScan.data;
    const KSMData = KSMScan.data;
    const companyProfileData = companyProfileScan.data;
    const callingCopyData = callingCopyScan.data;
    const callingOrgData = callingOrgScan.data;
    const notaryData = notaryScan.data;

    const demandLetterObjectKey = `demandLetter/${demandLetterScan.filename}`
    const KSMObjectKey = `KSM/${KSMScan.filename}`
    const companyProfileObjectKey = `companyProfile/${companyProfileScan.filename}`
    const callingCopyObjectKey = `callingCopy/${callingCopyScan.filename}`
    const callingOrgObjectKey = `callingOrg/${callingOrgScan.filename}`
    const notaryObjectKey = `notary/${notaryScan.filename}`

    // Upload Data string to S3 bucket
    const uploadToS3 = async (DataString, fileType, bucketName, objectKey) => {
        const isImageFile = isImage(fileType);
        const isPDFFile = isPDF(fileType);
        const isWordFile = isWord(fileType);
        const isExcelFile = isExcel(fileType);

        if (isImageFile) {
            const Data = DataString.replace(/^data:image\/\w+;base64,/, '');
            const binaryData = Buffer.from(Data, 'base64');

            const params = {
                Bucket: bucketName,
                Key: objectKey,
                Body: binaryData,
            };

            const command = new PutObjectCommand(params);

            try {
                const response = await s3Client.send(command);
                console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
            } catch (error) {
                console.error('An error occurred while uploading to S3:', error);
            }
        }
        if (isPDFFile) {
            const Data = DataString.replace(/^data:application\/pdf;base64,/, '');
            const binaryData = Buffer.from(Data, 'base64');

            const params = {
                Bucket: bucketName,
                Key: objectKey,
                Body: binaryData,
            };

            const command = new PutObjectCommand(params);

            try {
                const response = await s3Client.send(command);
                console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
            } catch (error) {
                console.error('An error occurred while uploading to S3:', error);
            }
        }
        if (isWordFile) {
            const Data = DataString.replace(/^data:application\/pdf;base64,/, '');
            const binaryData = Buffer.from(Data, 'base64');

            const params = {
                Bucket: bucketName,
                Key: objectKey,
                Body: binaryData,
            };

            const command = new PutObjectCommand(params);

            try {
                const response = await s3Client.send(command);
                console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
            } catch (error) {
                console.error('An error occurred while uploading to S3:', error);
            }
        }
        if (isExcelFile) {
            const Data = DataString.replace(/^data:application\/pdf;base64,/, '');
            const binaryData = Buffer.from(Data, 'base64');

            const params = {
                Bucket: bucketName,
                Key: objectKey,
                Body: binaryData,
            };

            const command = new PutObjectCommand(params);

            try {
                const response = await s3Client.send(command);
                console.log(`Uploaded file to S3: ${response.$metadata.httpStatusCode}`);
            } catch (error) {
                console.error('An error occurred while uploading to S3:', error);
            }
        }
    };

    // Generate S3 URL
    const generateS3Url = (bucketName, objectKey) => {
        const region = 'ap-south-1';
        return `https://s3-${region}.amazonaws.com/${bucketName}/${objectKey}`;
    };

    uploadToS3(demandLetterData, demandLetterScan.contentType, bucketName, demandLetterObjectKey)
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    const demandLetterScanData = {
        filename: demandLetterScan.filename,
        contentType: demandLetterScan.contentType,
        s3URL: generateS3Url(bucketName, demandLetterObjectKey)
    }


    uploadToS3(KSMData, KSMScan.contentType, bucketName, KSMObjectKey)
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    let KSMScanData = {
        filename: KSMScan.filename,
        contentType: KSMScan.contentType,
        s3URL: generateS3Url(bucketName, KSMObjectKey)
    }

    uploadToS3(companyProfileData, companyProfileScan.contentType, bucketName, companyProfileObjectKey)
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    let companyProfileScanData = {
        filename: companyProfileScan.filename,
        contentType: companyProfileScan.contentType,
        s3URL: generateS3Url(bucketName, companyProfileObjectKey)
    }

    uploadToS3(callingCopyData, callingCopyScan.contentType, bucketName, callingCopyObjectKey)
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    let callingCopyScanData = {
        filename: callingCopyScan.filename,
        contentType: callingCopyScan.contentType,
        s3URL: generateS3Url(bucketName, callingCopyObjectKey)
    }

    uploadToS3(callingOrgData, callingOrgScan.contentType, bucketName, callingOrgObjectKey)
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    let callingOrgScanData = {
        filename: callingOrgScan.filename,
        contentType: callingOrgScan.contentType,
        s3URL: generateS3Url(bucketName, callingOrgObjectKey)
    }

    uploadToS3(notaryData, notaryScan.contentType, bucketName, notaryObjectKey)
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    let notaryScanData = {
        filename: notaryScan.filename,
        contentType: notaryScan.contentType,
        s3URL: generateS3Url(bucketName, notaryObjectKey)
    }


    let demandTotal = {
        male: demandMale,
        female: demandFemale
    }

    const newCompany = new Company({ companyName, companyAddress, postCode, demandTotal, employees, companyPhNo, demandLetterScanData, KSMScanData, companyProfileScanData, callingCopyScanData, callingOrgScanData, notaryScanData });

    newCompany.save()
        .then(() => {
            res.sendStatus(200);
            console.log('it work');
        })
        .catch(error => {
            console.log('it suck');
            console.error('An error occurred:', error);
        })
}

exports.companyModify = async (req, res) => {
    try {
        const { idNo } = req.body;
        const all_datas = await Company.findById({ _id: idNo });
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.companyModifyRequest = async (req, res) => {
    try {
        const data = req.body;
        const all_datas = await Company.findById({ _id: data._id });
        Object.assign(all_datas, data);
        const updatedCompany = await all_datas.save();
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.companyDelete = async (req, res) => {
    try {
        const { idNo } = req.body;
        const all_datas = await Company.findById({ _id: idNo });
        // console.log(all_datas.demandLetterScanData.filename);
        const bucketName = 'shanpyaephyo';

        const demandLetterObjectKey = `demandLetter/${all_datas.demandLetterScanData.filename}`
        const KSMObjectKey = `KSM/${all_datas.KSMScanData.filename}`
        const companyProfileObjectKey = `companyProfile/${all_datas.companyProfileScanData.filename}`
        const callingCopyObjectKey = `callingCopy/${all_datas.callingCopyScanData.filename}`
        const callingOrgObjectKey = `callingOrg/${all_datas.callingOrgScanData.filename}`
        const notaryObjectKey = `notary/${all_datas.notaryScanData.filename}`

        s3Delete(bucketName, demandLetterObjectKey);
        s3Delete(bucketName, KSMObjectKey);
        s3Delete(bucketName, companyProfileObjectKey);
        s3Delete(bucketName, callingCopyObjectKey);
        s3Delete(bucketName, callingOrgObjectKey);
        s3Delete(bucketName, notaryObjectKey);

        await Company.deleteOne({ _id: idNo });
        res.sendStatus(200);
        console.log('it work');
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

exports.companySingleInfo = async (req, res) => {
    try {
        const { idNo } = req.body;
        const all_datas = await Company.findById({ _id: idNo });
        res.json(all_datas);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};