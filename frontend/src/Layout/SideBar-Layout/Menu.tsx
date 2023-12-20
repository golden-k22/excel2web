import { Grid, Home } from "react-feather";

const MENUITEMS = [
  {
    title: "Admin Panel",
    icon: <Home />,
    menu: [
      {
        title: "User List",
        url: `${process.env.PUBLIC_URL}/admin_panel/user_list`,
        type: "link",
      },
      {
        title: "Employee List",
        url: `${process.env.PUBLIC_URL}/admin_panel/employee_list`,
        type: "link",
      },
    ],
  },
  {
    title: "Support",
    icon: <Grid />,
    // url:"https://support.pixelstrap.com/"
  },
];



export default MENUITEMS;
