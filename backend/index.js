import e from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from "mongoose";
import router from './routes/apis.routes.js';
import { downloadFile } from './controller/upload.controller.js';

dotenv.config();

const app = e();
const PORT = process.env.PORT || 10000;

app.use(e.json());

app.use(cors());

app.use('/files', e.static('fileFolder'));

app.get('/', (req, res) => {
    res.json({ message: "Server is runnung" })
})
app.use('/api/v1', router)
app.get('/file/:fileid', downloadFile)

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("DB Connection Error ", err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port - ${PORT}`);
})