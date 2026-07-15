require('dotenv').config();
import cors from "cors";
import express from "express";
import cronog from "./src/routes/cronog";
import task from "./src/routes/task";
import auth from "./src/routes/auth";
import color from "./src/routes/color";

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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rodando na porta ${process.env.PORT || 5001}`);
});

export default app;
