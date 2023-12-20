const Worksheet = require("../Models/WorksheetModel");
const WorksheetData =require("../Models/WorksheetData");
const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports.worksheetListByUser = async (req, res, next) => {
  

  try {
      const userId = req.params.userId;
      const companyCode = req.query.company_code;
      const Worksheets = await Worksheet.find({user:userId, company_code:companyCode})
      .populate('user')
      .populate('ws_datas')
      .exec(function (err, results) {
           res.send(results);
      });
      
  } catch (error) {
      console.log(error);
  }
}

module.exports.worksheetDataList = async (req, res, next) => {

  try {

      const worksheetId = req.params.worksheetId;
      const worksheetData = await Worksheet.find({_id:worksheetId})
      .populate('user')
      .populate('ws_datas')
      .exec(function (err, results) {
           res.send(results);
      });
      
  } catch (error) {
      console.log(error);
  }
}


module.exports.addWorksheetData = async (req, res, next) => {
  try {

    const userId = req.params.userId;
    const { ws_id, ws_name, ws_desc, ws_company, ws_datas } = req.body;

    await WorksheetData.deleteMany({ws_id:ws_id});
    let ws_data_ids = [];
    let subPromise = new Promise(function (resolve, reject) {
      ws_datas.forEach(async function (ws_data) {
        const worksheet_data = await WorksheetData.create({
          ws_id: ws_id, employee: ws_data.employee, pay: ws_data.pay, tax_frequency: ws_data.tax_frequency,
          temperary: ws_data.temperary, reg_hours: ws_data.reg_hours, overtime_hours: ws_data.overtime_hours, reg_earning: ws_data.reg_earning, overtime_earning: ws_data.overtime_earning,
          other_earnings: ws_data.other_earnings, adjust_deduction: ws_data.adjust_deduction, adjust_statutory_deduction: ws_data.adjust_statutory_deduction, demo: ws_data.demo,
          cancel_automatic_pay: ws_data.cancel_automatic_pay, other_hours: ws_data.other_hours, pay_end_date: ws_data.pay_end_date
        }); 
           
        ws_data_ids.push(worksheet_data._id);
        if(ws_data_ids.length===ws_datas.length){
          resolve(ws_data_ids);
        }
      });
    })
    subPromise.then(
      async function (value) {
        const filter = { _id: ws_id };
        const update = { ws_name:ws_name, ws_description: ws_desc, user:userId,company_code:ws_company,ws_datas: value };
        let worksheet = await Worksheet.findOneAndUpdate(filter, update);
        if(worksheet===null){
          worksheet=await Worksheet.create({ws_name:ws_name, ws_description: ws_desc, user:userId,company_code:ws_company,ws_datas: value});
          const filter = { ws_id: ws_id };
          const update = { ws_id: worksheet._id};
          let worksheetData = await WorksheetData.updateMany(filter, update); 
        }
        res.status(201).json({ worksheet: worksheet._id, created: true });
      },
      function (error) {
        res.status(301).json({ worksheet: 0, created: false });
      }
    )

    

  } catch (err) {
    console.log(err);
    res.json({ created: false });
  }
}


module.exports.deleteWorksheet = async (req, res, next) => {   
  try {
      const worksheetId = req.params.id;
      const worksheet = await Worksheet.findByIdAndDelete(worksheetId)      
      await WorksheetData.deleteMany({ws_id:worksheetId});
      res.send("Deleted successfully")      
  } catch (error) {
      console.log(error);
  }
}
