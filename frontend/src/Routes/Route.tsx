import UserHomePage from "../Pages/userHome"
import AdminPanelPage from "../Pages/AdminPanel"
import AdminEmployeeListPage from "../Pages/AdminEmployeeList"
import AddUserPage from "../Pages/addUser"
import AddEmployeePage from "../Pages/addEmployee"
import EditUserPage from "../Pages/editUser"
import ManagePayrollPage from "../Pages/managePayroll"
import AddWorksheetPage from "../Pages/addWorksheet"
import EmployeeListPage from "../Pages/employeeList"
import MainWorksheetPage from '../Pages/mainWorksheet'
import React from "react";

const routes = 
    [
      { path: `${process.env.PUBLIC_URL}/admin_panel`, Component: <AdminPanelPage /> },
      { path: `${process.env.PUBLIC_URL}/admin_panel/user_list`, Component: <AdminPanelPage /> },
      { path: `${process.env.PUBLIC_URL}/admin_panel/employee_list`, Component: <AdminEmployeeListPage /> },
      { path: `${process.env.PUBLIC_URL}/edit/:id`, Component: <EditUserPage /> },
      { path: `${process.env.PUBLIC_URL}/add_user`, Component: <AddUserPage /> },
      { path: `${process.env.PUBLIC_URL}/add_employee`, Component: <AddEmployeePage /> },
      { path: `${process.env.PUBLIC_URL}/manage_payroll`, Component: <ManagePayrollPage /> },
      { path: `${process.env.PUBLIC_URL}/add_worksheet`, Component: <AddWorksheetPage /> },
      { path: `${process.env.PUBLIC_URL}/employee_list`, Component: <EmployeeListPage /> },
      { path: `${process.env.PUBLIC_URL}/home`, Component: <UserHomePage /> },
      { path: `${process.env.PUBLIC_URL}/main_worksheet`, Component: <MainWorksheetPage/> },
      { path: `${process.env.PUBLIC_URL}/main_worksheet/:id`, Component: <MainWorksheetPage/> },
      { path: `${process.env.PUBLIC_URL}/all_employee_list`, Component: <AdminEmployeeListPage /> },
    ]
export default routes;
