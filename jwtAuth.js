import express from "express";
import jwt from "jsonwebtoken"
const SECRET = "abcdef";

const app = express();

app.use(express.json());
//Middleware
function auth(req,res,next){
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) res.status(401).json({error : "No Token"});

    try{
        req.user = jwt.verify(token,SECRET);
        next();
    } catch(error){
        res.status(401).json({error : "Invalid Token"});
    }
}
app.get("/",(req,res)=> {
    res.send("<h1>JWT is Working</h1>");
});

app.post("/login",(req,res)=> {
    const user = {id:1,username:"kabeer"}
    const token = jwt.sign(user,SECRET);
    res.json({token});
})

app.get("/protected",auth,(req,res)=> {
    res.json({message : "secret data", user:req.user});
})

const PORT = 5000;

app.listen(PORT,()=> console.log(`server is running on http://localhost:${PORT}`))