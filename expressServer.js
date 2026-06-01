import connectDb from "./db.js";
import dotenv from "dotenv"
import express from "express"
import dns from "dns"
dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();
dotenv.config()
connectDb();
app.use(express.json());

app.get("/",(req,res)=> {
    res.send("<h1>Hello Kabeer Boss</h1>")
});

app.listen(process.env.PORT,()=> console.log("Server running"))