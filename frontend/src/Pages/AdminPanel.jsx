import React, { useEffect } from 'react'
import UserTable from '../Components/Admin/AdminPanel/UserTableData';
import Breadcrumbs from "../CommonElements/Breadcrumbs";
const AdminPanel = () => {
  return (
    <div className="page-body">
      {/* <Breadcrumbs parent="Pages" title="Admin Panel" /> */}
      <UserTable />
    </div>
  );
};

export default AdminPanel;