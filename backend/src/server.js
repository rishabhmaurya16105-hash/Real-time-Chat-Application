import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';   //hamne auth.route.js file me router ko export 
// kiya hai and usi router ko ham yaha authroutes ke name se import kar rahe hain .ham authroutes ka name kuch aur bhi rakh sakte hain.


import messageRoutes from './routes/message.route.js';   
import path from 'path';

dotenv.config();  // ye line env file ko load kar rahi hai.

const app = express();
const __dirname = path.resolve();
const PORT=process.env.PORT || 3000;  // agar port nahi mila toh 3000 par run karega.

app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messageRoutes);
    

// make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (_,res)=>{
        res.sendFile(path.join(__dirname, "../frontend ", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log('Server is running on port :' +PORT);
});