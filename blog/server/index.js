import express from "express";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./userRouter/userRouter.js"
import cors from "cors"
import articleRouter from "./articleRouter/articleRouter.js"
import multer from 'multer';
import morgan from 'morgan';
dotenv.config();
const app = express();
app.use(cors({origin: "http://localhost:3000" , credentials: true }))
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));


const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.post("/upload", upload.single("picture"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
mongoose
.connect(process.env.DB)
.then(() => console.log('db подкл'))
.catch(() => {console.log('ERROR')})
const PORT = 5000 

app.listen(PORT, () => {
    console.log('порт подклч')
})

app.use("/api", userRouter);
app.use("/api", articleRouter);

