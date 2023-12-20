const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    
    first_name: {
        type: String,
        required: [true, "First Name is Required"],
    },
    last_name: {
        type: String,
        required: [true, "Last Name is Required"],
    },
    
    age: {
        type: Number, min: 1, max: 100,
        required: [true, "Salary is Required"],
    },
    annual_salary_rate:{
        type:Number,
        required: [true, "Salary is Required"],
    },
    company_code:{
        type:String,
        // required: [true, "Company code is Required"],
    },
    status: {
        type: String,
    },
    pay_type: {
        type: String,
    },
    file_number:{
        type:String,
    },
    residence_province: {
        type: String,
    },
    start_date: {
        type: Date,
    },
    location: {
        type: String,
    },
    employment_province: {
        type: String,
    },
    federal_tax:{
        type:Number,
    },
    provincial_tax:{
        type:Number,
    },
    additional_tax:{
        type:Number,
    },
    el_rate: {
        type: String,
    }
});

module.exports = mongoose.model("Employee", employeeSchema);

