const mongoose = require("mongoose")

const WorksheetDataSchema = new mongoose.Schema({
       
    ws_id: {
        type: String,
        required: true
    },
    employee: {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Employee',
        required: true
    },    
    pay: {
        type: String,
    },
    tax_frequency: {
        type: String,
    },
    temperary: {
        type: String,
    },    
    reg_hours: {
        type: String,
    },
    overtime_hours: {
        type: String,
    },
    reg_earning: {
        type: String,
    },
    overtime_earning: {
        type: String,
    },
    other_earnings: {
        type: String,
    },
    adjust_deduction: {
        type: String,
    },
    adjust_statutory_deduction: {
        type: String,
    },
    demo: {
        type: String,
    },
    cancel_automatic_pay: {
        type: String,
    },
    other_hours: {
        type: String,
    },
    pay_end_date: {
        type: String,
    },
});

module.exports = mongoose.model("WorksheetData", WorksheetDataSchema);

