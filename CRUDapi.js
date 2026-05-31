import express from "express"
const app = express();

app.use(express.json());
const users = [
    {id:1, username: "kabeer", email: "kabeer@gmail.com"},
    {id:2, username : "Aditi", email: "aditi@gmail.com"}
]
app.get("/",(req,res)=> {
    res.send("<h1>CRUD API</h1>");
});

app.get("/users",(req,res)=> {
    res.status(200).json(users);
})

app.get("/users/:id",(req,res)=> {
    const user = users.find(u=> u.id==req.params.id);
    if(!user) return res.status(404).json({message : "User Not Found"});
    res.status(200).json(user);
})

app.post("/new",(req,res)=> {
    const {username, email} = req.body;
    
    const exist = users.find(u=> u.email == email || u.username == username);
    if(exist){
        res.status(400).json({message :"Already Exist"});
    }
    
     const newUser = {
            id:users.length+1,
            username,
            email,
        }
        users.push(newUser);
        res.status(201).json(newUser);
});

app.put("/users/:id",(req,res)=> {
    const {username,email} = req.body;
    const user = users.find(u=> u.id == req.params.id);
    if(!user) return res.status(404).json({message : "User Not Found"});
    user.username = username || user.username;
    user.email = email || user.email;
    res.status(200).json(user);
});

app.delete("/users/:id",(req,res)=> {
    const index = users.findIndex(u=> u.id === parseInt(req.params.id));
    if(index===-1){
       return res.json({message : "User not found"});
    }
    users.splice(index,1);
    res.json({message : "User Deleted Succesfully"});
});
const PORT = 5000;

app.listen(PORT,()=> console.log(`server is running on http://localhost:${PORT}`));