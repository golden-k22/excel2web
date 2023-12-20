import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import { Table } from 'react-bootstrap'
import '@popperjs/core';
import 'bootstrap';
import {Btn} from '../../AbstractElements'



function MainWorksheet() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [employeeDetailModalOpen, setEmployeeDetailModalOpen] = useState(false)
  const [multiRowsModalOpen, setMultiRowsModalOpen] = useState(false)
  const [columnModalOpen, setColumnModalOpen] = useState(false)
  const [deleteRowModalOpen, setDeleteRowModalOpen] = useState(false)
  const [deleteColumnModalOpen, setDeleteColumnModalOpen] = useState(false)
  const [codeList, setCodeList] = useState([])
  const [heading, setHeading] = useState('')
  const [field, setField] = useState('')
  const [codeDisplayStatus, setCodeDisplayStatus] = useState(false)
  const [fieldDisplayStatus, setFieldDisplayStatus] = useState(false)
  const [tableHeaderOption, setTableHeaderOption] = useState(['Label note', 'Name', 'Pay #', 'Tax Frequency', 'Temporary Rate', 'Regular Hours',
  'Overtime Hours', 'Regular Earnings', 'Overtime Earning'])
  const [addedColumnOption, setAddedColumnOption] = useState([])
  const [codeSelected, setCodeSelected] = useState(false)
  const [payDataSelected, setPayDataSelected] = useState(false)
  const [rowData, setRowData] = useState([]);
  const [batchRowData, setBatchRowData] = useState([])
  const [rowIndex, setRowIndex] = useState('')
  const [columnIndex, setColumnIndex] = useState('')
  const [balanceRowData, setBalanceRowData] = useState([])
  const [initData, setInitialData] = useState([])
  const [differenceRowData, setDifferenceRowData] = useState([])
  const [employeeDetailData, setEmployeeDetailData] = useState([])
  const [selectedMultiRows, setSelectedMultiRows] = useState(0)
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('Moore, Rafael')
  const [selectedEmployeeFileNum, setSelectedEmployeeFileNum] = useState('000567')
  const [selectedRow, setSelectedRow] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('')
  const [worksheetInfo, setWorksheetInfo] = useState([])

  const {id} = useParams()
  var worksheet_info = JSON.parse(localStorage.getItem('worksheet_info'))
  const employeeList = JSON.parse(localStorage.getItem('employeeList'))
  const allEmployeeList = JSON.parse(localStorage.getItem('allEmployeeList'))

  var employeeData = []
  var batchTotalData = []  
  var initialData = []
  
  useEffect(() => {    
    getWorksheetData(id)          
  }, []);

  const getWorksheetData = async(id) => {
    var listData = []
    if(id === undefined){
      setWorksheetInfo(worksheet_info)
      initialRowData()
      initialBatchData()
      setBatchRowData(batchTotalData)
      setDifferenceRowData(batchTotalData)
      setInitialData(initialData)
      setBalanceRowData(initialData)
    }else{
      const response = await axios.get("http://localhost:4000/serve/worksheet_data/" + id );
      if (response.status === 200) {  
        worksheet_info = JSON.parse(localStorage.getItem('worksheet_info'))
        worksheet_info['description'] = response.data[0].ws_description
        worksheet_info['name'] = response.data[0].ws_name
        setWorksheetInfo(worksheet_info)
        var datas = []
        for(let i = 0; i < response.data[0].ws_datas.length; i++){
          const empData = await axios.get("http://localhost:4000/serve/employee/" + response.data[0].ws_datas[i].employee);          
          response.data[0].ws_datas[i]['employee'] = empData.data.employee._id
          response.data[0].ws_datas[i]['label'] = empData.data.employee.file_number
          response.data[0].ws_datas[i]['name'] = empData.data.employee.first_name + ', ' + empData.data.employee.last_name
          var data = []
          for(let k = 0; k < Object.keys(response.data[0].ws_datas[i]).length; k++){
            if(Object.keys(response.data[0].ws_datas[i])[k] !== 'ws_id'){
              if(Object.keys(response.data[0].ws_datas[i])[k] === 'other_earnings'){
                const string = response.data[0].ws_datas[i][Object.keys(response.data[0].ws_datas[i])[k]]
                for(let p = 0; p < string.split(', ').length; p++){
                  const key = Object.keys(response.data[0].ws_datas[i])[k] + '_' + string.split(', ')[p].split(':')[0]
                  const value = string.split(', ')[p].split(':')[1]
                  data[key] = value 
                }
              }else if(Object.keys(response.data[0].ws_datas[i])[k] === 'other_hours'){
                const string = response.data[0].ws_datas[i][Object.keys(response.data[0].ws_datas[i])[k]]
                for(let p = 0; p < string.split(', ').length; p++){
                  const key = Object.keys(response.data[0].ws_datas[i])[k] + '_' + string.split(', ')[p].split(':')[0]
                  const value = string.split(', ')[p].split(':')[1]
                  data[key] = value 
                }
              }else if(Object.keys(response.data[0].ws_datas[i])[k] === 'adjust_deduction'){
                const string = response.data[0].ws_datas[i][Object.keys(response.data[0].ws_datas[i])[k]]
                for(let p = 0; p < string.split(', ').length; p++){
                  const key = Object.keys(response.data[0].ws_datas[i])[k] + '_' + string.split(', ')[p].split(':')[0]
                  const value = string.split(', ')[p].split(':')[1]
                  data[key] = value 
                }
              }else if(Object.keys(response.data[0].ws_datas[i])[k] === 'adjust_statutory_deduction'){
                const string = response.data[0].ws_datas[i][Object.keys(response.data[0].ws_datas[i])[k]]
                for(let p = 0; p < string.split(', ').length; p++){
                  const key = Object.keys(response.data[0].ws_datas[i])[k] + '_' + string.split(', ')[p].split(':')[0]
                  const value = string.split(', ')[p].split(':')[1]
                  data[key] = value 
                }
              }else if(Object.keys(response.data[0].ws_datas[i])[k] === 'demo'){
                const string = response.data[0].ws_datas[i][Object.keys(response.data[0].ws_datas[i])[k]]
                for(let p = 0; p < string.split(', ').length; p++){
                  const key = Object.keys(response.data[0].ws_datas[i])[k] + '_' + string.split(', ')[p].split(':')[0]
                  const value = string.split(', ')[p].split(':')[1]
                  data[key] = value 
                }
              }else{
                data[Object.keys(response.data[0].ws_datas[i])[k]] = response.data[0].ws_datas[i][Object.keys(response.data[0].ws_datas[i])[k]]
              }
            }
          }
          datas.push(data)
        } 
      }  
     
      for(let i = 0; i < datas.length; i++){
        var data_order = {
          'employee':'', 'label':'', 'name':'', 'pay':'', 'tax_frequency':'', 'temperary': '', 'reg_hours':'',
          'overtime_hours':'', 'reg_earning':'', 'overtime_earning':''
        }       
        for(let k = 0; k < Object.keys(datas[0]).length; k++){  
            if(Object.keys(datas[0])[k].includes('other_earnings')){
              data_order[Object.keys(datas[0])[k]] = ''
            }else if(Object.keys(datas[0])[k] === 'cancel_automatic_pay'){
              data_order[Object.keys(datas[0])[k]] = ''
            }else if(Object.keys(datas[0])[k].includes('adjust_deduction')){
              data_order[Object.keys(datas[0])[k]] = ''
            }else if(Object.keys(datas[0])[k].includes('adjust_statutory_deduction')){
              data_order[Object.keys(datas[0])[k]] = ''
            }else if(Object.keys(datas[0])[k].includes('demo')){
              data_order[Object.keys(datas[0])[k]] = ''
            }else if(Object.keys(datas[0])[k].includes('other_hours')){
              data_order[Object.keys(datas[0])[k]] = ''
            }else if(Object.keys(datas[0])[k].includes('pay_end_date')){
              data_order[Object.keys(datas[0])[k]] = ''
            }
        }
        
        for(let j = 0; j < Object.keys(data_order).length; j++){
          for(let k = 0; k < Object.keys(datas[i]).length; k++){
            if(Object.keys(datas[i])[k] === Object.keys(data_order)[j]){
              data_order[Object.keys(data_order)[j]] = datas[i][Object.keys(datas[i])[k]]
            }
          }
        }
        employeeData.push(data_order)        
      }
      for(let k = 0; k < Object.keys(datas[0]).length; k++){        
        if(Object.keys(datas[0])[k].includes('other_earnings')){
          tableHeaderOption.push(Object.keys(datas[0])[k].replace('other_earnings_', 'Other Earnings - '))
          addedColumnOption.push(Object.keys(datas[0])[k].replace('other_earnings_', 'Other Earnings - '))
        }else if(Object.keys(datas[0])[k] === 'cancel_automatic_pay'){
          tableHeaderOption.push(Object.keys(datas[0])[k].replace('cancel_automatic_pay', 'Cancel Automatic Pay'))
          addedColumnOption.push(Object.keys(datas[0])[k].replace('cancel_automatic_pay', 'Cancel Automatic Pay'))
        }else if(Object.keys(datas[0])[k].includes('other_hours')){
          tableHeaderOption.push(Object.keys(datas[0])[k].replace('other_hours_', 'Other Hours - '))
          addedColumnOption.push(Object.keys(datas[0])[k].replace('other_hours_', 'Other Hours - '))
        }else if(Object.keys(datas[0])[k].includes('adjust_deduction')){
          tableHeaderOption.push(Object.keys(datas[0])[k].replace('adjust_deduction_', 'Adjust Deduction - '))
          addedColumnOption.push(Object.keys(datas[0])[k].replace('adjust_deduction_', 'Adjust Deduction - '))
        }else if(Object.keys(datas[0])[k].includes('adjust_statutory_deduction')){
          tableHeaderOption.push(Object.keys(datas[0])[k].replace('adjust_statutory_deduction_', 'Adjust Statutory Deduction - '))
          addedColumnOption.push(Object.keys(datas[0])[k].replace('adjust_statutory_deduction_', 'Adjust Statutory Deduction - '))
        }else if(Object.keys(datas[0])[k].includes('demo')){
          tableHeaderOption.push(Object.keys(datas[0])[k].replace('demo_', 'Demo - '))
          addedColumnOption.push(Object.keys(datas[0])[k].replace('demo_', 'Demo - '))
        }
     }
     setRowData(employeeData)
    }   
  }  
  const initialRowData = () => {    
    for(let i = 0 ; i < employeeList.length; i++){
      var data = {        
        'employee':'', 'label':'', 'name':'', 'pay':'', 'tax_frequency':'', 'temperary': '', 'reg_hours':'',
        'overtime_hours':'', 'reg_earning':'', 'overtime_earning':''
      }
      data['employee'] = employeeList[i]._id
      data['label'] = employeeList[i].file_number
      data['name'] = employeeList[i].first_name + ', ' + employeeList[i].last_name
      employeeData.push(data)
    }    
    setRowData(employeeData)
  }
  const initialBatchData = () => {
    for(let j = 1; j < Object.keys(employeeData[0]).length; j++){
      var value = ''
      var key = Object.keys(employeeData[0])[j]
      if(Object.keys(employeeData[0])[j] === 'label' || Object.keys(employeeData[0])[j] === 'name' || Object.keys(employeeData[0])[j] === 'pay' || Object.keys(employeeData[0])[j] === 'tax_frequency' || Object.keys(employeeData[0])[j] === 'cancel_automatic_pay'){
        value = ''
      }else{
        value = parseFloat(0).toFixed(2)  
      }   
      batchTotalData[key] = value
      initialData[key] = value   
    }
    setBatchRowData(batchTotalData)
    setBalanceRowData(initialData)
  }
  const calBatchTotalData = (newData) => {
    const newBatchData = []
    for(let j = 1; j < Object.keys(newData[0]).length; j++){
      var value = ''
      if(Object.keys(newData[0])[j] === 'cancel_automatic_pay' || Object.keys(newData[0])[j] === 'name' || Object.keys(newData[0])[j] === 'pay' || Object.keys(newData[0])[j] === 'tax_frequency'){
        value = ''
      }else{
        value = parseFloat( newData.reduce((accumulator, currentValue) => {
          if(currentValue[Object.keys(newData[0])[j]] === '') currentValue[Object.keys(newData[0])[j]] = 0.00     
          accumulator += parseFloat(currentValue[Object.keys(newData[0])[j]])
          return accumulator
        }, 0)).toFixed(2)
      }          
      var key = Object.keys(newData[0])[j]     
      newBatchData[key] = value           
    }
    setBatchRowData(newBatchData)   
    setDifferenceRowData(newBatchData)
  }

  const calBalanceTotalData = (newData) => {
    const newBalanceData = []
    for(let j = 1; j < Object.keys(newData[0]).length; j++){
      var value = ''
      if(Object.keys(newData[0])[j] === 'cancel_automatic_pay' || Object.keys(newData[0])[j] === 'name' || Object.keys(newData[0])[j] === 'pay' || Object.keys(newData[0])[j] === 'tax_frequency'){
        value = ''
      }else{
        value = parseFloat(0).toFixed(2)
      }          
      var key = Object.keys(newData[0])[j]     
      newBalanceData[key] = value           
    }
    setBalanceRowData(newBalanceData)    
  }
  const onSubmit=() => {    
    navigate(`${process.env.PUBLIC_URL}/manage_payroll`);
  }
  const handleEmployeeListClick = () => {
    setEmployeeModalOpen(true);
  }
  const handleMultiRowsListClick = () => {
    if(rowIndex === '')
      generateInfo('Please select a employee.')
    else
      setMultiRowsModalOpen(true);
  }
  const handleNewRowListClick = () => {
    var newRowData = {}    
    if(rowIndex === ''){
      generateInfo('Please select a employee')
    }else{
      for(let j = 0; j < Object.keys(rowData[rowIndex]).length; j++){
        
        if(Object.keys(rowData[rowIndex])[j] === 'name' || Object.keys(rowData[rowIndex])[j] === 'label' || Object.keys(rowData[rowIndex])[j] === 'employee'){
          newRowData[Object.keys(rowData[rowIndex])[j]] = rowData[rowIndex][Object.keys(rowData[rowIndex])[j]]
        }
        else{
          newRowData[Object.keys(rowData[rowIndex])[j]] = ''
        }
      }      
      var newData = []
      for (let i = 0; i < rowIndex + 1; i++){
        newData.push(rowData[i])
      }
      newData.push(newRowData)
      for (let i = rowIndex + 1; i < rowData.length; i++){
        newData.push(rowData[i])
      }      
      setRowData(newData)      
    }   
  }
 
  const handleColumnListClick = () => {
    setColumnModalOpen(true);
  }  

  const multiRowsOption = [
    '2', '3', '4', '5', '6', '7', '8', '9'
  ];

  const payOption = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ]

  const taxOption = [
    '', '0-Std Freq-O weeks', '1-Spread taxes over 1 week', '2-Spread taxes over 2 weeks', '3-Spread taxes over 3 weeks',
    '4-Spread taxes over 4 weeks', '5-Spread taxes over 5 weeks', '6-Spread taxes over 6 weeks', '7-Spread taxes over 7 weeks',
    '8-Spread taxes over 8 weeks', '9-Spread taxes over 9 weeks', 'B-Bonus', 'D-Daily (7-day work week)',
    'F-Daily (5-day work week)', 'H-Teachers(20 payments)', 'L-Lump Sum', 'S-Semi-monthly'
  ]

  const payDataOption = [
    'Other Earnings', 'Adjust Deduction', 'Adjust Statutory Deduction', 'Demo',
    'Cancel Automatic Pay', 'Other Hours', 'Pay Period End Date'
  ];

  const autoPayOption = [
    'Y-Cancel Automatic Pay', 'N-Do not Cancel Automatic Pay'
  ]

  const codeOption = [
    [
      'VAT-Vacation on Termination', 'BON-Bonus', 'RET-Retro', 'PIL-Pay In Lieu', 'RET EL-Retiring Allowance Eligible',
      'RET-INEL-Retiring Allowance Ineligible', 'TOP-UP-Mat Top Up', 'STD-STD Pay', 'COMM-Commissions', 'REIMB-Reimbursement',
      'SCK-SICK', 'VAC-Vacation', 'AVAC-Auto Vacation'
    ], 
    [
      'LFE-Basic Life', 'ADD-AD&D', 'LTD-LTD'
    ],
    [
      'CPP-CPP', 'EI-EI Premium', 'FIT-Federal Tax'
    ],
    [
      'BEHT-BC EHT', 'DEN-Dental', 'MED-Medical'
    ],
    [

    ],
    [
      'SCK-Sick', 'VAC-Vacation'
    ], 
    [

    ]
  ];

  const fieldOption = [
    '3', '4'
  ]

  const tableLabelOption =[
    'Batch Total', 'Your Total', 'Difference'
  ]


  const onFileListChange = (e) => {
    for(let i = 0; i < allEmployeeList.length; i++){
      if(allEmployeeList[i].file_number === e.target.value) {        
        setSelectedEmployeeName(allEmployeeList[i].first_name + ', ' + allEmployeeList[i].last_name)
        setSelectedEmployeeFileNum(e.target.value)
      } 
    }    
  }

  const addSelectedEmployee = () => {
    var newRowData = {}
    var selectedEmployeeData = []
    for (let i = 0; i < allEmployeeList.length; i++){
     
      if(allEmployeeList[i].file_number === selectedEmployeeFileNum){
        selectedEmployeeData = allEmployeeList[i]
      }
    }    
    for(let j = 0; j < Object.keys(rowData[0]).length; j++){
        
      if(Object.keys(rowData[0])[j] === 'name' ){
        newRowData[Object.keys(rowData[0])[j]] = selectedEmployeeName
      }else if(Object.keys(rowData[0])[j] === 'label'){
        newRowData[Object.keys(rowData[0])[j]] = selectedEmployeeFileNum
      }else if(Object.keys(rowData[0])[j] === 'employee'){
        newRowData[Object.keys(rowData[0])[j]] = selectedEmployeeData._id
      }else{
        newRowData[Object.keys(rowData[0])[j]] = ''
      }
    }      
    var newData = []        
    for (let i = 0; i < rowData.length; i++){
      newData.push(rowData[i])
    }
    newData.push(newRowData)     
    setRowData(newData)
  }

  const onPayDataListChange = (e) => {
    setCodeList(codeOption[e.target.selectedIndex - 1])
    setHeading(e.target.value)
    setPayDataSelected(true)
    if(e.target.selectedIndex === 1){
      setCodeDisplayStatus(true)
      setFieldDisplayStatus(true)
    }else if(e.target.selectedIndex === 5){
      setCodeSelected(true)
      setCodeDisplayStatus(false)
      setFieldDisplayStatus(false)
    }else{
      setCodeDisplayStatus(true)
      setFieldDisplayStatus(false)
    }

  }

  const onCodeListChange = (e) => {
    var newHeading = ''
    if(e.target.value.toString().split('-').length > 2){
      newHeading = heading.split(' - ')[0] + ' - ' + e.target.value.toString().split('-')[2]
    }else{      
      newHeading = heading.split(' - ')[0] + ' - ' + e.target.value.toString().split('-')[1]
    }
    setCodeSelected(true)
    setHeading(newHeading)  
    if(heading.split(' - ')[0] === 'Other Earnings'){
      if(e.target.selectedIndex < 11){
        setField(4)
      }else{
        setField(3)
      }
    }
  }

  const columnModalCancelHandler = () => {
    initialColumnModal()
    setColumnModalOpen(false)
  }

  const columnModalSubmitHandler = () => {
    if(payDataSelected && codeSelected){
      var str = heading.split(' - ')[0].toLowerCase().split(' ').join('_')
      
      const key = heading.replace(heading.split(' - ')[0], str).replace(' - ', '_')
      var value = ''     
      const newData = rowData.map((o) => ({
        ...o, 
        [key]: value
      }))
      tableHeaderOption.push(heading)
      addedColumnOption.push(heading)
      const newColumn = heading.split(' - ')[0]
      var newEmpData = []

      const empData = newData;
      var isExist = false;
      for(let i = 0; i <Object.keys(empData[0]).length; i++){
        if(Object.keys(empData[0])[i] === newColumn) {
         
          isExist = true;
        }
      }

      if(isExist){
        for(let i = 0; i <Object.keys(empData[0]).length; i++){
          
          if(Object.keys(empData[0])[i] === newColumn){
            empData[0][newColumn] = empData[0][newColumn] + ', ' + heading.split(' - ')[1] + ':' + value
          }
        }
        
      }else{
        newEmpData = rowData.map((o) => ({
          ...o, 
          [newColumn]: heading.split(' - ')[1] + ':' + value 
        }))
      }
      setRowData(newData)     
      calBatchTotalData(newData)
      calBalanceTotalData(newData)      
      initialColumnModal()
      setColumnModalOpen(false)
    }else{
      generateInfo('Please select correctly')      
    }   
    
  }

  const initialColumnModal = () => {
    setCodeDisplayStatus(false)
    setFieldDisplayStatus(false)
    setHeading('')
    setCodeSelected(false)
    setPayDataSelected(false)
  } 

  const generateInfo = (info) =>
        toast.info(info, {
          position: "top-center",
        }); 

  const generateSuccess = (info) =>
        toast.success(info, {
          position: "top-center",
        }); 

  const balanceBtnHandler = () => {    
    setBalanceRowData(batchRowData) 
    emptyData()
    generateSuccess('saved successfully.')
  }

  const emptyData =() => {
    var newData = []
    for(let i = 1; i < Object.keys(batchRowData).length; i++){
      newData[Object.keys(batchRowData)[i]] = ''
    }
    setDifferenceRowData(newData)
  }

  const editCellHandler = (e, row, column) => {  
    rowData[row][Object.keys(rowData[row])[column]] = e.target.value  
    setRowData(rowData)    
    calBatchTotalData(rowData) 
  }

  const addWorksheet = async() => {    
    const company_code = localStorage.getItem('company_code');
    const user_id = localStorage.getItem('user_id')    
    const wsEmpDatas = [];    
    for(let i = 0; i < rowData.length; i++){
      const wsEmpData = {};
      wsEmpData[Object.keys(rowData[i])[0]] = rowData[i][Object.keys(rowData[i])[0]]
      var other_earnings_value = ''
      var adjust_deduction_value = ''
      var adjust_statutory_deduction_value = ''
      var demo_value = ''
      var other_hours_value = ''
      for(let k = 3; k < Object.keys(rowData[i]).length; k++){          
        if(Object.keys(rowData[i])[k].includes('other_earnings')){          
          if(other_earnings_value === ''){
            other_earnings_value += Object.keys(rowData[i])[k].replace('other_earnings_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }else{
            other_earnings_value += ', ' + Object.keys(rowData[i])[k].replace('other_earnings_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }          
          wsEmpData['other_earnings'] = other_earnings_value          
        }else if(Object.keys(rowData[i])[k].includes('adjust_deduction')){
          if(adjust_deduction_value === ''){
            adjust_deduction_value += Object.keys(rowData[i])[k].replace('adjust_deduction_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }else{
            adjust_deduction_value += ', ' + Object.keys(rowData[i])[k].replace('adjust_deduction_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }
          wsEmpData['adjust_deduction'] = adjust_deduction_value

        }else if(Object.keys(rowData[i])[k].includes('adjust_statutory_deduction')){
          if(adjust_statutory_deduction_value === ''){
            adjust_statutory_deduction_value += Object.keys(rowData[i])[k].replace('adjust_statutory_deduction_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }else{
            adjust_statutory_deduction_value += ', ' + Object.keys(rowData[i])[k].replace('adjust_statutory_deduction_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }
          wsEmpData['adjust_statutory_deduction'] = adjust_statutory_deduction_value

        }else if(Object.keys(rowData[i])[k].includes('demo')){
          if(demo_value === ''){
            demo_value += Object.keys(rowData[i])[k].replace('demo_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }else{
            demo_value += ', ' + Object.keys(rowData[i])[k].replace('demo_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }
          wsEmpData['demo'] = demo_value

        }else if(Object.keys(rowData[i])[k].includes('other_hours')){
          if(other_hours_value === ''){
            other_hours_value += Object.keys(rowData[i])[k].replace('other_hours_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }else{
            other_hours_value += ', ' + Object.keys(rowData[i])[k].replace('other_hours_', '') + ':' + rowData[i][Object.keys(rowData[i])[k]]
          }
          wsEmpData['other_hours'] = other_hours_value
        }    
        else{          
          wsEmpData[Object.keys(rowData[i])[k]] = rowData[i][Object.keys(rowData[i])[k]]
        }
      }
      
      wsEmpDatas.push(wsEmpData)
    }  
  
    var data = {};
    if(id === undefined){
      data["ws_id"] = '111111111111111111111111'

    }else{
      data["ws_id"] = id

    }
    data["ws_name"] = worksheetInfo.name;
    data["ws_desc"] = worksheetInfo.description;
    data["ws_company"] = company_code;
    data["ws_datas"] = wsEmpDatas;
    try {
      const response = await axios.post(`http://localhost:4000/serve/worksheet_data/` + user_id, data)
      if (response) {
        if (response.data.errors) {
          const { name, email } = response.data.errors;
          if (name) generateError(name)
          else if (email) generateError(email)
        } else {
          generateSuccess("saved successfully")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const saveBtnHandler = () => {
    addWorksheet()
  }

  const clickedCellHandler = (e, row, column) => {
    setRowIndex(row)
    setColumnIndex(column)    
  }

  const viewEmployeeDataHandler = () => {
    if(rowIndex === ''){
      generateInfo('Please select a employee.')
      

    }else{
      for(let i = 0; i < allEmployeeList.length; i++){
        if(allEmployeeList[i].file_number === rowData[rowIndex].label){
          setEmployeeDetailData(allEmployeeList[i])  
        }
      }
      setEmployeeDetailModalOpen(true)      
    }    
  }

  const employeeDetailModalSubmitHandler = () => {
    setEmployeeDetailModalOpen(false)
  }

  const employeeModalCancelHandler = () => {
    setEmployeeModalOpen(false)

  }

  const employeeModalSubmitHandler = () => {
    addSelectedEmployee()
    setEmployeeModalOpen(false)

  }

  const onMultiRowsListChange = (e) => {
    setSelectedMultiRows(parseInt(e.target.value))

  }

  const addMultiRows = () => {
    var newRowData = {}
    
    if(rowIndex === ''){
      generateInfo('Please select a employee')
    }else{
      for(let j = 0; j < Object.keys(rowData[rowIndex]).length; j++){
        
        if(Object.keys(rowData[rowIndex])[j] === 'name' || Object.keys(rowData[rowIndex])[j] === 'label' || Object.keys(rowData[rowIndex])[j] === 'employee'){
          newRowData[Object.keys(rowData[rowIndex])[j]] = rowData[rowIndex][Object.keys(rowData[rowIndex])[j]]
        }        
        else{
          newRowData[Object.keys(rowData[rowIndex])[j]] = ''
        }
      }
      
      var newData = []
      for (let i = 0; i < rowIndex + 1; i++){
        newData.push(rowData[i])
      }
      for(let i = 0; i < selectedMultiRows; i++){
        newData.push(newRowData)
      }      
      for (let i = rowIndex + 1; i < rowData.length; i++){
        newData.push(rowData[i])
      }
     
      setRowData(newData)
      
    }   
  }

  const multiRowsModalSubmitHandler = () => {
    addMultiRows()
    setMultiRowsModalOpen(false)

  }

  const multiRowsModalCancelHandler = () => {    
    setMultiRowsModalOpen(false)
  }

  const onDeleteRowChange = (e) => {
    setSelectedRow(parseInt(e.target.value))

  }

  const deleteRowModalCancelHandler = () => {
    setDeleteRowModalOpen(false)

  }

  const deleteRowModalSubmitHandler = () => {
    deleteSelectedEmployee()

  }

  const deleteSelectedEmployee = () => {
    const newData = []
    if (selectedRow === ''){
      generateInfo('Please select index of row')
    }else{
      for(let i = 0; i < rowData.length; i++){
        if( i !== selectedRow - 1){
          newData.push(rowData[i])          
        }        
      }
      setRowData(newData)
      setDeleteRowModalOpen(false)
    }  
  }

  const handleDeleteRowClick = () => {
    setDeleteRowModalOpen(true)
  }

  const handleDeleteColumnClick = () => {
    setDeleteColumnModalOpen(true)
  }

  const onDeleteColumnChange = (e) => {
    setSelectedColumn(e.target.value)

  }

  const deleteColumnModalCancelHandler = () => {
    setDeleteColumnModalOpen(false)

  }

  const deleteColumnModalSubmitHandler = () => {
    deleteSelectedColumn()
    setDeleteRowModalOpen(false)

  }

  const deleteSelectedColumn = () => {
    const newDatas = []
    var index = 0
    const newColumnOption = []
    const newAddedColumn = []
    for(let i = 0; i < addedColumnOption.length; i++){
      if(addedColumnOption[i] === selectedColumn) {
        index = i
      }else{
        newAddedColumn.push(addedColumnOption[i])
      }
    }   

    for(let i = 0; i < rowData.length; i++){
      const newData = []
      for(let k = 0; k < Object.keys(rowData[i]).length; k++){
        if(k !== index + 10){
          var key = Object.keys(rowData[i])[k]
          var value = rowData[i][Object.keys(rowData[i])[k]]
          newData[key] = value
        }
      }
      newDatas.push(newData)
    }
    
    for(let i = 0; i < tableHeaderOption.length; i++){
      if(tableHeaderOption[i] !== selectedColumn){
        newColumnOption.push(tableHeaderOption[i])
      }
    }
    setAddedColumnOption(newAddedColumn)
    setTableHeaderOption(newColumnOption)
    setRowData(newDatas)
    calBatchTotalData(newDatas)
    calBalanceTotalData(newDatas)
    setDeleteColumnModalOpen(false)
    
  }

  const backBtnHandler = () => {
    navigate(`${process.env.PUBLIC_URL}/employee_list`);
  }

  const cancleBtnHandler = () => {
    navigate(`${process.env.PUBLIC_URL}/manage_payroll`);
  }

  const taxChangeHandler = (e) => {
    rowData[rowIndex].tax_frequency = e.target.value
  }

  const cancelAutoPayChangeHandler = (e) => {
    rowData[rowIndex].cancel_automatic_pay = e.target.value
  }

  const payChangeHandler = (e) => {
    rowData[rowIndex].pay = e.target.value
  }

  return (
    <>
      <div className='private'>
      <div>
          <Btn onClick={backBtnHandler} style={{borderRadius:'5px', backgroundColor:'red', color:'white', fontSize:'18px', fontWeight:'bold'}} ><FontAwesome className='fa-chevron-left'/> Back</Btn>
        </div>
        <br></br>
        <div style={{fontSize:'50px', fontWeight:'bold'}}>
          <span>WorkSheet</span>     
        </div>
        <div className='row'>
          <div className='col-4'>
            <div style={{fontSize: '28px'}}>
              <FontAwesome className='fa-table' name='table'> {worksheetInfo.name} </FontAwesome>
            </div>
            <div style={{fontSize: '16px', paddingLeft:'2%'}}>
              <span> {worksheetInfo.description} <FontAwesome className='fa-pencil' name='pencil'></FontAwesome></span>
            </div>

          </div>
          <div className='col-4'>
            <div style={{fontSize: '16px', paddingLeft:'1%'}}>
              <span> Status </span>
            </div>
            <div style={{fontSize: '20px', fontWeight:'bold'}}>
              <FontAwesome className='fa-check-square-o' name='check'>In balance</FontAwesome>
            </div>
          </div>
        </div>
        <div style={{textAlign:'right', fontSize: '20px', fontWeight:'bold'}}>
          <FontAwesome onClick={viewEmployeeDataHandler} className='fa-plus-circle' name='plus-circle'> VIEW EMPLOYEE DETAILS</FontAwesome>
        </div>
        <hr/>
        
        <div className='row' >
          <div className='col-2' style={{fontSize:'24px', fontWeight:'bold'}}>
            
            <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              INSERT
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item"  onClick={handleEmployeeListClick}>Employee(s)</a></li>
              <li><a className="dropdown-item" onClick={handleMultiRowsListClick}>Multiple Rows for Each Employee</a></li>
              <li><a className="dropdown-item" onClick={handleNewRowListClick}>New Row for Selected Employee</a></li>
              <li><a className="dropdown-item" onClick={handleColumnListClick}>Column</a></li>
            </ul>
           
          </div>
          <div className='col-1' style={{fontSize:'24px', fontWeight:'bold'}}>
            <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              DELETE
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={handleDeleteRowClick}>Row</a></li>
              <li><a className="dropdown-item" onClick={handleDeleteColumnClick}>Column</a></li>
            </ul>
          </div>
         
        </div>
        <div className='table' style={{fontSize:'18px'}}>
          <Table>
            <thead style={{fontWeight:'bold'}}>
              <tr>
              {
                tableHeaderOption.map((option, index) => {
                  return (
                  <th key={index}>{option}</th>
                  )
                })
              }
              </tr>             
            </thead>
            <tbody>
              {
                rowData.map((option, index) =>{    
                  var keys = Object.keys(option)
                  return (
                    <tr onClick={() => setRowIndex(index)} key={index}>
                      
                      {(() => {
                        let td = [];
                        for (let i = 1; i < keys.length; i++) {
                          if(keys[i] === 'label' || keys[i] === 'name'){
                            if (rowIndex === index ){
                              td.push(<td key={i} style={{color:'gray'}}>{option[keys[i]]}</td>); 
                            }else{
                              td.push(<td key={i}>{option[keys[i]]}</td>); 
                            }                            
                          }  
                          else if(keys[i] === 'pay'){
                            td.push(<td>
                              <select className='form-control' onChange={payChangeHandler}>
                                {
                                  payOption.map((op, index) =>{
                                    if(op === option.pay){
                                      return (
                                        <option key={index} selected>
                                          {op}
                                        </option>
                                        )
                                    }else{
                                      return (
                                        <option key={index}>
                                          {op}
                                        </option>
                                        )
                                    }      
                                  
                                  })
                                }
      
                              </select>
                            </td>);
                          }else if(keys[i] === 'tax_frequency'){
                            td.push(<td>
                              <select className='form-control' onChange={taxChangeHandler}>
                                {
                                  taxOption.map((op, index) =>{
                                    if(op === option.tax_frequency){
                                      return (
                                        <option key={index} selected>
                                          {op}
                                        </option>
                                        )
                                    }else{
                                      return (
                                        <option key={index}>
                                          {op}
                                        </option>
                                        )
                                    }      
                                  
                                  })
                                }
      
                              </select>
                            </td>);
                          }else if(keys[i] === 'cancel_automatic_pay'){
                            td.push(<td>
                              <select className='form-control' onChange={cancelAutoPayChangeHandler}>
                                <option></option>                            
                                {
                                  autoPayOption.map((op, index) =>{
                                    if(op === option.cancel_automatic_pay){
                                      return (
                                        <option key={index} selected>
                                          {op}
                                        </option>
                                        )
                                    }else{
                                      return (
                                        <option key={index}>
                                          {op}
                                        </option>
                                        )
                                    }                                  
                                  })
                                }
      
                              </select>
                            </td>);  
                            

                          }else{
                            if (rowIndex === index && columnIndex === i){
                              td.push(<td><input id={i} className="form-control" type="number" defaultValue={option[keys[i]]} onBlur={(e) => editCellHandler(e, index, i)} ></input></td>);
                            }else{
                              td.push(<td onClick = {(e) => clickedCellHandler(e, index, i)}>{option[keys[i]]}</td>)
                            }      
                          }                          
                        }
                        return td;
                      })()}                               
                    </tr>
                  )
                })
              }              
              
              <tr style={{borderTop:'2px'}}>    
                      <td>Batch Total</td>                           
                      {(() => {
                        let td = [];
                        for (let i = 1; i < Object.keys(batchRowData).length; i++) {                         
                             td.push(<td key={i}>{batchRowData[Object.keys(batchRowData)[i]]}</td>);                                                 
                        }
                        return td;
                      })()}                    
              </tr>
              <tr style={{borderTop:'2px'}}>    
                      <td>Your Total</td>                 
                      
                      {(() => {
                        let td = [];
                        for (let i = 1; i < Object.keys(balanceRowData).length; i++) {                          
                             td.push(<td key={i}>{balanceRowData[Object.keys(balanceRowData)[i]]}</td>);                                                 
                        }
                        return td;
                      })()}                       
              </tr>
              <tr style={{borderTop:'2px'}}>    
                      <td>Difference</td>   
                      {(() => {
                        let td = [];
                        for (let i = 1; i < Object.keys(differenceRowData).length; i++) {                          
                             td.push(<td key={i}>{differenceRowData[Object.keys(differenceRowData)[i]]}</td>);                                                 
                        }
                        return td;
                      })()}                   
              </tr>
            </tbody>            
          </Table>          
        </div>
        <br></br>
        <br></br>

        <div style={{textAlign:'right'}}>
          <Btn className='btn btn-light' style={{borderColor:'blue', fontSize:'20px', margin: '8px'}} onClick={cancleBtnHandler}>
            CANCEL
          </Btn>
          <Btn className='btn btn-light' style={{fontSize:'20px', margin: '8px'}} onClick={saveBtnHandler}>
            SAVE
          </Btn>
          <Btn className='btn btn-light' style={{fontSize:'20px', margin: '8px'}} onClick={balanceBtnHandler}>
            AUTO BALANCE
          </Btn>          
          <Btn className='btn btn-primary' style={{fontSize:'20px', margin: '8px'}} onClick={onSubmit}>DONE</Btn>
        </div>     
                   
        <Modal
          isOpen={employeeModalOpen}      
        >
          <ModalHeader>
            <div style={{fontWeight:'bold'}}>
              <h3>Insert Employee(s)</h3>
            </div>        
          </ModalHeader>
          <ModalBody >
          <div style={{fontSize:'18px'}}>
            <div>
              <span>File Number</span>
            </div>
            <div >
              <select onChange={onFileListChange} style={{padding:'20px', borderRadius:'8px'}}>                
                {(() => {
                  let option = [];
                  option.push(<option defaultValue=' '></option>)
                  for (let i = 0; i < allEmployeeList.length; i++) {
                    option.push(<option key={i + 1}>{allEmployeeList[i].file_number}</option>)                           
                  }
                  return option;
                })()}  
              </select>
            </div>
          <br></br>
        <div>
          <span>Name</span>
        </div>
        <div>
          <input value={selectedEmployeeName}></input>        
        </div>
        </div>               
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-light" onClick={employeeModalCancelHandler}>
          CANCEL
        </button>
        <button className="btn btn-primary" onClick={employeeModalSubmitHandler}>
          DONE
        </button>   
      </ModalFooter>
    </Modal>
    <Modal
      isOpen={multiRowsModalOpen}      
    >
      <ModalHeader>
        <div style={{fontWeight:'bold'}}>
          <h3>Insert Multiple Rows for Each Employee</h3>
        </div>        
      </ModalHeader>
      <ModalBody >
        <div style={{fontSize:'18px'}}>
        <div style={{textAlign:'center'}}>
          <span>Select number of rows</span>
        </div>
        <div style={{textAlign:'center'}} >
          <select onChange={onMultiRowsListChange} style={{padding:'20px', borderRadius:'8px'}}>
            <option></option>
            {multiRowsOption.map((option, index) => {
              return (
                <option key={index}>
                  {option}
                </option>
              )
            })}
          </select>
        </div>
        <br></br>
        </div>    
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-light" onClick={multiRowsModalCancelHandler}>
          CANCEL
        </button>
        <button className="btn btn-primary" onClick={multiRowsModalSubmitHandler}>
          DONE
        </button>   
      </ModalFooter>
    </Modal>
    <Modal
      isOpen={columnModalOpen}      
    >
      <ModalHeader>
        <div style={{fontWeight:'bold'}}>
          <h3>Insert Column</h3>
        </div>        
      </ModalHeader>
      <ModalBody >
        <div style={{fontSize:'18px'}}>
          <p>Select a paydata field to insert from the list below</p>
        <div>
          <span>Paydata Field</span>
        </div>
        <div >
          <select onChange={onPayDataListChange} style={{padding:'20px', borderRadius:'8px'}}>
            <option disabled selected>Select a paydata field</option>
            {payDataOption.map((option, index) => {
              return (
                <option key={index}>
                  {option}
                </option>
              )
            })}
          </select>
        </div>   
        <br></br>

        {codeDisplayStatus &&(
          <div>
          <div>
            <span>Code/Type</span>
          </div>
          <div>
          <select onChange={onCodeListChange} style={{padding:'20px', borderRadius:'8px'}}>
              <option disabled selected>Select a code</option>
              {codeList.map((option, index) => {
                return (
                  <option key={index}>
                    {option}
                  </option>
                )  
              })}
            </select>
          </div>  
          </div>
        )}

        {fieldDisplayStatus && (
          <div>
            <br></br>
            <div>
              <span>Field #</span>
            </div>
            <div>
              <input value={field} readOnly style={{padding:'20px', borderRadius:'8px'}}></input>
            </div>
          </div>
        )}
        <br></br>
        <div>
          <span>Column Heading</span>
        </div>
        <div>
          <input value={heading} readOnly style={{padding:'20px', borderRadius:'8px'}}></input>
        </div>    
        </div>        
        
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-light" onClick={columnModalCancelHandler}>
          CANCEL
        </button>
        <button className="btn btn-primary" onClick={columnModalSubmitHandler}>
          DONE
        </button>    
        
      </ModalFooter>
    </Modal>

    <Modal
      isOpen={employeeDetailModalOpen}      
    >
      <ModalHeader>
        <div style={{fontWeight:'bold'}}>
          <h3>Employee Detail</h3>
        </div>        
      </ModalHeader>
      <ModalBody>    
        <div>
          <a>Name:&nbsp;{employeeDetailData.first_name + ', ' + employeeDetailData.last_name}</a>
        </div>  
        <div>
          <a>Salary:&nbsp; {employeeDetailData.annual_salary_rate}</a>
        </div> 
        <div>
          <a>File Number: &nbsp; {employeeDetailData.file_number}</a>
        </div> 
        <div>
          <a>Status:&nbsp; {employeeDetailData.status} </a>
        </div>           
         
      </ModalBody>
      <ModalFooter>
        
        <button className="btn btn-primary" onClick={employeeDetailModalSubmitHandler}>
          OK
        </button>    
        
      </ModalFooter>
    </Modal>

    <Modal
      isOpen={deleteRowModalOpen}      
    >
      <ModalHeader>
        <div style={{fontWeight:'bold'}}>
          <h3>Delete Selected Row</h3>
        </div>        
      </ModalHeader>
      <ModalBody> 
        <div style={{fontSize:'18px', textAlign:'center'}}>
          <a>Select index of row</a>

        </div> 
        <br></br>
        <div style={{textAlign:'center'}}>
          <select onChange={onDeleteRowChange} style={{padding:'20px', borderRadius:'8px'}}>  
            {(() => {
              let option = [];
              option.push(<option defaultValue=' '></option>)
              for (let i = 0; i < rowData.length; i++) {
              option.push(<option key={i + 1}>{i + 1}</option>)                           
              }
              return option;
            })()}    
          </select>
        </div>         
        
      </ModalBody>
      <ModalFooter>        
        <button className="btn btn-light" onClick={deleteRowModalCancelHandler}>
          CANCEL
        </button>
        <button className="btn btn-primary" onClick={deleteRowModalSubmitHandler}>
          DONE
        </button>  
        
      </ModalFooter>
    </Modal>

    <Modal
      isOpen={deleteColumnModalOpen}      
    >
      <ModalHeader>
        <div style={{fontWeight:'bold'}}>
          <h3>Delete Selected Column</h3>
        </div>        
      </ModalHeader>
      <ModalBody> 
        <div style={{fontSize:'18px', textAlign:'center'}}>
          <a>Select a column name</a>

        </div> 
        <br></br>
        <div style={{textAlign:'center'}}>
          <select onChange={onDeleteColumnChange} style={{padding:'20px', borderRadius:'8px'}}>  
            {(() => {
              let option = [];
              option.push(<option defaultValue=' '></option>)
              for (let i = 0; i < addedColumnOption.length; i++) {
              option.push(<option key={i + 1}>{addedColumnOption[i]}</option>)                           
              }
              return option;
            })()}    
          </select>
        </div>         
        
      </ModalBody>
      <ModalFooter>
        
        <button className="btn btn-light" onClick={deleteColumnModalCancelHandler}>
          CANCEL
        </button>
        <button className="btn btn-primary" onClick={deleteColumnModalSubmitHandler}>
          DONE
        </button>  
        
      </ModalFooter>
    </Modal>        
      </div>
      <ToastContainer />
    </>
  )
}

export default MainWorksheet