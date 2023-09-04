import express from "express";
import articleCtrl from "../ctrls/articleCtrl.js";
import auth from "../middleware/middleware.js";

const router = express.Router();

router.post("/article", auth ,   articleCtrl.create);
router.get("/articles", articleCtrl.getArticles);
router.delete("/delete/:id", articleCtrl.deleteBlog);
router.get('/post/:id', articleCtrl.getOnePost);



export default router;