import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';   //hamne auth.route.js file me router ko export 
// kiya hai and usi router ko ham yaha authroutes ke name se import kar rahe hain .ham authroutes ka name kuch aur bhi rakh sakte hain.


import messageRoutes from './routes/message.route.js';   
import path from 'path';
import { connectDB } from './lib/db.js';    

dotenv.config();  // ye line env file ko load kar rahi hai.

const app = express();
const __dirname = path.resolve();
const PORT=process.env.PORT || 3000;  // agar port nahi mila toh 3000 par run karega.

app.use(express.json());

app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messageRoutes);
    

// make ready for deployment ......frontend 5173 pe run hota hai and backend 3000 pe run hota hai.
// ye line of code frontend ko backend ko serve karta hai jisse ek hi port pe run ho sake.
if(process.env.NODE_ENV === "production"){  // ye check karta hai kya ham production (deployment) me hai ya development me.
    // and ye tabhi run hoga jab ham production me hai.
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); //frontend ki sari files backend me serve karo.
    app.get("*", (_,res)=>{
        res.sendFile(path.join(__dirname, "../frontend ", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log('Server is running on port :' +PORT);
    connectDB();
});