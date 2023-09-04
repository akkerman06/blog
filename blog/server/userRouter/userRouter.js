import express from "express"
import userCtrl from "../ctrls/userCtrl.js";


const router = express.Router();

router.post("/registr",userCtrl.registr)
router.post("/login",userCtrl.login)
router.post("/logout",userCtrl.logout)
router.get("/refresh_token", userCtrl.getUser);
export default router;