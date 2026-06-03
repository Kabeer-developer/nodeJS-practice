import express from "express"
import bcrypt from "bcrypt"

const app = express();

app.use(express.json());

app.get("/",(req,res)=> {
    res.send("<h1>Hash Password</h1>");
});

const users = [];
app.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    const hashedPass = await bcrypt.hash(password,10);
    users.push({username,password:hashedPass});
    res.status(201).json({message: "Account Created Succesfully"});
});

app.post("/login",async (req,res)=> {
    const {username,password} = req.body;
    const user = await users.find(u=> u.username === username);
    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid){
        return res.status(401).json({message : "Invalid Credentials"});
    }
    res.json({message : "Login Succesfull"});
});

const PORT = 5000;
console.log(users);
app.listen(PORT,()=> console.log(`server is running on http://localhost:${PORT}`))