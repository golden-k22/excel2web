import React, { useEffect } from 'react'
import EmployeeTable from '../Components/Admin/AdminPanel/EmployeeTableData';
import Breadcrumbs from "../CommonElements/Breadcrumbs";
const AdminEmployeeList = () => {
  return (
    <div className="page-body">
      {/* <Breadcrumbs parent="Pages" title="Admin Panel" /> */}
      <EmployeeTable />
    </div>
  );
};

export default AdminEmployeeList;