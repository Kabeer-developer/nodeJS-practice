
import express from "express"
import connectDb from "./db.js"
import User from "./schema.js"
import dotenv from "dotenv"
// import dns from "dns"
// dns.setServers(["1.1.1.1","8.8.8.8"]);
const app = express();
dotenv.config();
connectDb();

app.use(express.json());

app.get("/", (req,res)=> {
    res.send("OK");
});

app.post("/register",async (req,res)=> {
    try{
        const {username,password} = req.body;
        const exist = await User.findOne({username});
        if(exist){
            return res.status(400).json({message : "user already exist"});
        }

        const newUser = new User({username,password});
        await newUser.save();
        res.status(201).json({message: "created succesfully", user : newUser});
    } catch(e){
        res.json(e);
    }
});

app.get("/users", async(req,res)=> {
   try{
    const users = await User.find().select("-password");
    if(!users) {
        res.status(400).json({message : "User not found"});
    }
    res.status(200).json(users);
   } catch(e){
    res.json(e);
   }
});

app.get("/users/:id", async (req,res)=> {
    try{
        const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
    } catch(e){
res.json(e);
}
})
app.put("/users/:id", async(req,res)=> {
    try{
      const {username,password} = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{username,password},{new:true,renValidator:true});
      if(!updatedUser) {
        res.status(400).json({message : "User not found"})
      }
    
       res.status(200).json({message : "Updated Succesfully",
                            user : updatedUser }
       );
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "User deleted successfully",
            user: deletedUser
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT,()=> console.log(`Server running on http://localhost:${process.env.PORT}`));