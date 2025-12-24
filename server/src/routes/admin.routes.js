

//===================proper workimg
/*
import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
*/

//------------------------------------updatiung
import express from "express";
import { loginAdmin, registerAdmin,getPendingUsers,approveUser,rejectUser,singleUser,updateUserStatus} from "../controllers/admin.controller.js";

const router = express.Router();

/**
 * @route   POST /api/admin/register
 * @desc    Register new admin
 * @access  Public (restrict later)
 */
router.post("/register", registerAdmin);

/**
 * @route   POST /api/admin/login
 * @desc    Admin login
 * @access  Public
 */
router.post("/login", loginAdmin);




router.get("/pending-users",
  // protects,
  getPendingUsers,);


  router.get("/users/:id",
  // protects,
  singleUser,);


  

router.put("/approve/:userId", 
  // protects,
   approveUser);
  
router.put("/reject/:userId", 
    //protects, 
    
    rejectUser);


    router.patch(
  "/admin/users/:id",
  // protects,
  updateUserStatus
);




export default router;