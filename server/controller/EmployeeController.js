const Employee = require('../model/employee');

exports.searchEmployee = async (req, res) => {
    try {
        let all_datas = await Employee.find(req.body);
        res.status(200).json(all_datas);
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

    try {
        let { name, passportNo, passportType, gender, dob, dobString, ppIssueDate, ppIssueDateString, ppExpireDate, ppExpireDateString, pob, authority, fatherName, motherName, address, nrcNo, phNo, agent, companyName, airPlaneNo, departureDate, departureDateString } = req.body;
        
        // let anotherDate = new Date(dob);

        // format DOB
        // const anotherYear = anotherDate.getFullYear();
        // const anotherMonth = (anotherDate.getMonth() + 1).toString().padStart(2, '0');
        // const anotherDay = anotherDate.getDate().toString().padStart(2, '0');
        // dobUpdate = anotherYear + "-" + anotherMonth + "-" + anotherDay;

        // age calculate
        let today = new Date();
        let newDate = new Date(dob);
        let calAge = today.getFullYear() - newDate.getFullYear();
        let monthDiff = today.getMonth() - newDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < newDate.getDate())) {
            calAge--;
        }

        let age = calAge;

        // format DOB String

        let dateDOB = new Date(dob);
        let dayDOB = dateDOB.getDate();
        let monthDOB = dateDOB.getMonth() + 1;
        let yearDOB = dateDOB.getFullYear();
        dayDOB = (dayDOB < 10 ? "0" : "") + dayDOB;
        monthDOB = (monthDOB < 10 ? "0" : "") + monthDOB;
        dobString = dayDOB + "." + monthDOB + "." + yearDOB;

        // format ID String

        let dateID = new Date(ppIssueDate);
        let dayID = dateID.getDate();
        let monthID = dateID.getMonth() + 1;
        let yearID = dateID.getFullYear();
        dayID = (dayID < 10 ? "0" : "") + dayID;
        monthID = (monthID < 10 ? "0" : "") + monthID;
        ppIssueDateString = dayID + "." + monthID + "." + yearID;

        // format ED String

        let dateED = new Date(ppExpireDate);
        let dayED = dateED.getDate();
        let monthED = dateED.getMonth() + 1;
        let yearED = dateED.getFullYear();
        dayED = (dayED < 10 ? "0" : "") + dayED;
        monthED = (monthED < 10 ? "0" : "") + monthED;
        ppExpireDateString = dayED + "." + monthED + "." + yearED;

        // format DD String

        let dateDD = new Date(departureDate);
        let dayDD = dateDD.getDate();
        let monthDD = dateDD.getMonth() + 1;
        let yearDD = dateDD.getFullYear();
        dayDD = (dayDD < 10 ? "0" : "") + dayDD;
        monthDD = (monthDD < 10 ? "0" : "") + monthDD;
        departureDateString = dayDD + "." + monthDD + "." + yearDD;

        const newEmployee = new Employee({ name, passportNo, passportType, gender, dob, dobString, age, ppIssueDate, ppIssueDateString, ppExpireDate, ppExpireDateString, pob, authority, fatherName, motherName, address, nrcNo, phNo, agent, companyName, airPlaneNo, departureDate, departureDateString });

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
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
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
        // format DOB String

        let dateDOB = new Date(data.dob);
        let dayDOB = dateDOB.getDate();
        let monthDOB = dateDOB.getMonth() + 1;
        let yearDOB = dateDOB.getFullYear();
        dayDOB = (dayDOB < 10 ? "0" : "") + dayDOB;
        monthDOB = (monthDOB < 10 ? "0" : "") + monthDOB;
        data.dobString = dayDOB + "." + monthDOB + "." + yearDOB;

        // format ID String

        let dateID = new Date(data.ppIssueDate);
        let dayID = dateID.getDate();
        let monthID = dateID.getMonth() + 1;
        let yearID = dateID.getFullYear();
        dayID = (dayID < 10 ? "0" : "") + dayID;
        monthID = (monthID < 10 ? "0" : "") + monthID;
        data.ppIssueDateString = dayID + "." + monthID + "." + yearID;

        // format ED String

        let dateED = new Date(data.ppExpireDate);
        let dayED = dateED.getDate();
        let monthED = dateED.getMonth() + 1;
        let yearED = dateED.getFullYear();
        dayED = (dayED < 10 ? "0" : "") + dayED;
        monthED = (monthED < 10 ? "0" : "") + monthED;
        data.ppExpireDateString = dayED + "." + monthED + "." + yearED;

        // format DD String

        let dateDD = new Date(data.departureDate);
        let dayDD = dateDD.getDate();
        let monthDD = dateDD.getMonth() + 1;
        let yearDD = dateDD.getFullYear();
        dayDD = (dayDD < 10 ? "0" : "") + dayDD;
        monthDD = (monthDD < 10 ? "0" : "") + monthDD;
        data.departureDateString = dayDD + "." + monthDD + "." + yearDD;

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
        await Employee.deleteOne({ _id: idNo });
        res.sendStatus(200);
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

