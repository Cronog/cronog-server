require('dotenv').config();

import https from 'https';
import fs from 'fs';
import cors from "cors";
import express from "express";
import cronog from "./routes/cronog";
import task from "./routes/task";
import auth from "./routes/auth";
import color from "./routes/color";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use(cronog);
app.use(task);
app.use(color);
app.use(auth);

const PORT = process.env.PORT || 5001;
const httpsOptions = {
    cert: fs.readFileSync('./server.crt'),
    key: fs.readFileSync('./server.key'),
  };
  
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Servidor rodando com HTTPS na porta ${PORT}`);
  });

export default app;
