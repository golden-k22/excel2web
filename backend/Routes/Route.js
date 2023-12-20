const { login, register } = require("../Controllers/UserController");
const { employeeLists, deleteEmployee, deleteAllEmployees,addEmployee, getEmployee } = require("../Controllers/EmployeeController");
const { adminLogin, adminPanel, deleteUser,deleteAllUsers,blockUser, unBlockUser, editUser, updateUser } = require("../Controllers/AdminController")
const { verifyUser, verifyAdmin } = require("../Middlewares/AuthMiddleware");
const { worksheetListByUser, worksheetDataList, addWorksheetData, deleteWorksheet } = require("../Controllers/WorksheetController");

const router = require("express").Router();

router.post("/serve/",login)
router.post("/serve/register",register)
// router.post("/home",verifyUser)



// Admin Routes

// router.post("/admin_login", login)
// router.post("/admin_verify",verifyAdmin)

router.get("/serve/admin_panel", adminPanel)
router.delete("/serve/delete_user/:id", deleteUser)
router.delete("/serve/delete_all_users/:id", deleteAllUsers)
router.get("/serve/edit/:id", editUser)
router.post("/serve/update/:id", updateUser)
router.put("/serve/block_user/:id", blockUser)
router.put("/serve/unblock_user/:id", unBlockUser)

router.get("/serve/employee_list", employeeLists)
router.delete("/serve/delete_employee/:id", deleteEmployee)
router.delete("/serve/delete_all_employees/:id", deleteAllEmployees)
router.post("/serve/add_employee", addEmployee)
router.get("/serve/employee/:id", getEmployee)


router.get("/serve/worksheets/:userId", worksheetListByUser)
router.get("/serve/worksheet_data/:worksheetId", worksheetDataList)
router.post("/serve/worksheet_data/:userId", addWorksheetData)
router.delete("/serve/delete_worksheet/:id", deleteWorksheet)

module.exports = router;