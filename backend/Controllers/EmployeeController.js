const Employee = require("../Models/Employee");
const jwt = require("jsonwebtoken")
require("dotenv").config();

// Initiate Admin in database
const initializeEmployee = async () => {
  var queries = [
    { company_code: '7M5', first_name: 'Rafael', last_name: 'Moore', age: 22, status: 'Active', pay_type: 'Salary', file_number: '000567', annual_salary_rate: 83000, residence_province: 'Alberta', start_date: new Date('11/5/2020'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 21003, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '2RY', first_name: 'Sam', last_name: 'Brooks', age: 19, status: 'Active', pay_type: 'Salary', file_number: '000568', annual_salary_rate: 65000, residence_province: 'Ontario', start_date: new Date('10/1/1988'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '7M5', file_number: '000569', first_name: 'Sabrina', last_name: 'Holmes', age: 21, status: 'Active', pay_type: 'Salary', annual_salary_rate: 53000, residence_province: 'Ontario', start_date: new Date('10/2/1999'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '2RY', file_number: '000570', first_name: 'Sarah', last_name: 'Campbell', age: 17, status: 'Active', pay_type: 'Salary', annual_salary_rate: 58000, residence_province: 'Ontario', start_date: new Date('1/14/2022'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '4JT', file_number: '000571', first_name: 'Emma', last_name: 'Henderson', age: 22, status: 'Active', pay_type: 'Hourly', annual_salary_rate: 18.5, residence_province: 'Ontario', start_date: new Date('1/15/2022'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Regular' },
    { company_code: '4JT', file_number: '000572', first_name: 'Kevin', last_name: 'Hunt', age: 26, status: 'Active', pay_type: 'Hourly', annual_salary_rate: 26.65, residence_province: 'Ontario', start_date: new Date('1/16/2022'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Regular' },
    { company_code: '4JT', file_number: '000573', first_name: 'Ted', last_name: 'Ferguson', age: 20, status: 'Active', pay_type: 'Hourly', annual_salary_rate: 35.5, residence_province: 'British Columbia', start_date: new Date('17-Jan-22'), location: 'Head Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11981, additional_tax: null, el_rate: 'Regular' },
    { company_code: '2RY', file_number: '000574', first_name: 'John', last_name: 'Thomas', age: 30, status: 'Active', pay_type: 'Hourly', annual_salary_rate: 23.8, residence_province: 'British Columbia', start_date: new Date('18-Jan-22'), location: 'Head Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11981, additional_tax: null, el_rate: 'Regular' },
    { company_code: '2RY', file_number: '000575', first_name: 'Ted', last_name: 'Farrell', age: 25, status: 'Active', pay_type: 'Salary', annual_salary_rate: 80000, residence_province: 'Manitoba', start_date: new Date('19-Jan-22'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 15000, additional_tax: '$100', el_rate: 'Reduced' },
    { company_code: '2RY', file_number: '000576', first_name: 'Mike', last_name: 'Andrews', age: 28, status: 'Active', pay_type: 'Salary', annual_salary_rate: 75000, residence_province: 'Ontario', start_date: new Date('20-Jan-22'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '4JT', file_number: '000577', first_name: 'Preston', last_name: 'Campbell', age: 24, status: 'Active', pay_type: 'Salary', annual_salary_rate: 102000, residence_province: 'Ontario', start_date: new Date('21-Jan-21'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '4JT', file_number: '000578', first_name: 'James', last_name: 'Barnes', age: 19, status: 'Active', pay_type: 'Salary', annual_salary_rate: 107000, residence_province: 'Ontario', start_date: new Date('22-Jan-22'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '4JT', file_number: '000579', first_name: 'Alfred', last_name: 'Perkins', age: 24, status: 'Active', pay_type: 'Salary', annual_salary_rate: 45000, residence_province: 'Ontario', start_date: new Date('23-Jan-22'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '4JT', file_number: '000580', first_name: 'Michael', last_name: 'Adams', age: 28, status: 'Active', pay_type: 'Salary', annual_salary_rate: 57000, residence_province: 'British Columbia', start_date: new Date('24-Jan-14'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11981, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '7M5', file_number: '000581', first_name: 'Ted', last_name: 'Evans', age: 28, status: 'Active', pay_type: 'Salary', annual_salary_rate: 48000, residence_province: 'British Columbia', start_date: new Date('25-Jan-22'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11981, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '7M5', file_number: '000582', first_name: 'Roland', last_name: 'Hill', age: 22, status: 'Active', pay_type: 'Salary', annual_salary_rate: 83000, residence_province: 'British Columbia', start_date: new Date('26-Jan-22'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11981, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '7M5', file_number: '000583', first_name: 'Carina', last_name: 'Carroll', age: 30, status: 'Active', pay_type: 'Salary', annual_salary_rate: 64000, residence_province: 'British Columbia', start_date: new Date('27-Jan-22'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 11981, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '7M5', file_number: '000584', first_name: 'Grace', last_name: 'Kelley', age: 20, status: 'Active', pay_type: 'Salary', annual_salary_rate: 61000, residence_province: 'Quebec', start_date: new Date('28-Jan-22'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 17183, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '2RY', file_number: '000585', first_name: 'Tara', last_name: 'Hunt', age: 20, status: 'Active', pay_type: 'Salary', annual_salary_rate: 62000, residence_province: 'Alberta', start_date: new Date('29-Jan-22'), location: 'Home Office', employment_province: 'British Columbia', federal_tax: 15000, provincial_tax: 21003, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '2RY', file_number: '000586', first_name: 'Freddie', last_name: 'Cameron', age: 23, status: 'Active', pay_type: 'Salary', annual_salary_rate: 77000, residence_province: 'Ontario', start_date: new Date('30-Jan-16'), location: 'Ontario Office', employment_province: 'Ontario', federal_tax: 15000, provincial_tax: 11865, additional_tax: null, el_rate: 'Reduced' },
    { company_code: '4JT', file_number: '000587', first_name: 'James', last_name: 'King', age: 33, status: 'Active', pay_type: 'Salary', annual_salary_rate: 50000, residence_province: 'Ontario', start_date: new Date('29-Jan-22'), location: 'Ontario Office', el_rate: 'Reduced' },
    { company_code: '7M5', file_number: '000588', first_name: 'Lauran', last_name: 'Helen', age: 50, status: 'Active', pay_type: 'Hourly', annual_salary_rate: 40, residence_province: 'BC', start_date: new Date('12-Jan-23'), location: 'BC Office', el_rate: 'Reduced' },
    { company_code: '2RY', file_number: '000589', first_name: 'Larry', last_name: 'Barry', age: 40, status: 'Active', pay_type: 'Salary', annual_salary_rate: 90000, residence_province: 'Alberta', start_date: new Date('12-Jan-23'), location: 'Home Office', el_rate: 'Reduced' },
    { company_code: '2RY', file_number: '000590', first_name: 'Ham', last_name: 'Brown', age: 43, status: 'Active', pay_type: 'Salary', annual_salary_rate: 70000, residence_province: 'Ontario', start_date: new Date('18-Jan-23'), location: 'Home Office', el_rate: 'Reduced' },
  ],
    update = {},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  queries.forEach(function (query) {
    Employee.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      // do something with the document
    });
  });

}
initializeEmployee();
module.exports.employeeLists = async (req, res, next) => {

  try {

      const companyCode = req.query.company_code;
      if (companyCode){
        const EmployeeData = await Employee.find({company_code: companyCode})
        res.send(EmployeeData)
      }else{
        const EmployeeData = await Employee.find()
        res.send(EmployeeData)
      }
      
      
  } catch (error) {
      console.log(error);
  }
}

module.exports.deleteEmployee = async (req, res, next) => {

  try {
      const employeeId = req.params.id
      const EmployeeData = await Employee.findByIdAndDelete(employeeId)
      res.send("Deleted successfully")      
  } catch (error) {
      console.log(error);
  }
}
module.exports.deleteAllEmployees = async (req, res, next) => {

  try {
      const loggedUserId = req.params.id
      const EmployeeData = await Employee.deleteMany({ _id: { $ne: loggedUserId } })
      res.send("Deleted successfully")      
  } catch (error) {
      console.log(error);
  }
}


module.exports.addEmployee = async (req, res, next) => {
  try {

      const { first_name, last_name, age, salary } = req.body;  
      const employee = await Employee.create({ first_name:first_name, last_name:last_name, age:age, annual_salary_rate:salary });
      res.status(201).json({ employee: employee._id, created: true });

  } catch (err) {
      console.log(err);
      res.json({ created: false });
  }
};

module.exports.getEmployee = async (req, res, next) => {

  try {
      const employeeId = req.params.id;
      const employee = await Employee.findOne({_id:employeeId});
      res.status(200).json({ employee: employee});
      
  } catch (error) {
    res.json({ employee: null});
  }
}

