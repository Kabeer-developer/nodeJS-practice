
import express from "express"
import multer from "multer"
import path from "path"

const app = express();
app.use(express.json());

app.get("/",(req,res)=> {
    res.send("<h1>Upload a File</h1>");
})

const storage = multer.diskStorage({
    destination : (req,file,cb)=> {
        cb(null,"nodeJS-practice/uploads/");
    },
    filename : (req,file,cb)=> {
        cb(null,Date.now+path.extname(file.originalname));
    }
})
const upload = multer({storage : storage});

app.post("/upload",upload.single("file"),(req,res,file)=> {
    if(!req.file){
        res.json({message : "Please select a file"});
    }
    res.json({message : "Uploaded Succesfully",
               file: req.file,
    }
    )
})

const PORT = 5000;

app.listen(PORT,()=> console.log(`API is running on http://localhost:${PORT}/`))