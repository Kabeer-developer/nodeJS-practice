import express from "express"
import dotenv from "dotenv"
import connectDb from "./db.js";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.get("/",(req,res)=> {
    res.send("<h1>Helloo Kabeer...</h1>")
});

app.listen(process.env.PORT,()=> {
    console.log("Server is Running");
})