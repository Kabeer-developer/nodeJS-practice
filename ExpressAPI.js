import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDb from "./db.js";


connectDb();
const app = express();
app.use(express.json());

app.get("/",(req,res)=> {
    res.send("<h1>Helloo Kabeer...</h1>")
});

app.listen(process.env.PORT,()=> {
    console.log("Server is Running");
})