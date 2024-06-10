const router = require('express').Router()
const EmployeeController = require('../controller/EmployeeController');

// employees routes
// route.post('/api/searchEmployee', EmployeeController.searchEmployee);
router.get('/api/employeeInfo', EmployeeController.employeeInfo);
router.post('/api/employeeUpload', EmployeeController.employeeUpload)
// route.post('/api/employeeModify', EmployeeController.employeeModify);
// route.put('/api/employeeModifyRequest', EmployeeController.employeeModifyRequest);
// route.delete('/api/employeeDelete', EmployeeController.employeeDelete);
// route.post('/api/employeeSingleInfo', EmployeeController.employeeSingleInfo);

// companies routes
// route.get('/api/companyInfo', controller.companyInfo);
// route.post('/api/companyUpload', controller.companyUpload)
// route.post('/api/companyModify', controller.companyModify);
// route.put('/api/companyModifyRequest', controller.companyModifyRequest);
// route.delete('/api/companyDelete', controller.companyDelete);
// route.post('/api/companySingleInfo', controller.companySingleInfo);

module.exports = router;