const mongoose = require("mongoose")

const WorksheetSchema = new mongoose.Schema({
    
    ws_name: {
        type: String,
        required: [true, "WorkSheet Name is Required"],
    },
    ws_description: {
        type: String,
        required: [true, "WorkSheet Description is Required"],
    },
    user: {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'Users',
        required: true
    },
    company_code: {
        type: String,
        required: true,
    },
    ws_datas: [{
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'WorksheetData',
        required: true
    }]
});

module.exports = mongoose.model("Worksheet", WorksheetSchema);

