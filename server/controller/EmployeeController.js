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

    let { name, passportNo, passportType, gender, dob, ppIssueDate, ppExpireDate, pob, authority } = req.body;
    
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

    let date = new Date(dob);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    day = (day < 10 ? "0" : "") + day;
    month = (month < 10 ? "0" : "") + month;
    dob = day + "." + month + "." + year;

    const newEmployee = new Employee({ name, passportNo, passportType, gender, dob, age, ppIssueDate, ppExpireDate, pob, authority });

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

