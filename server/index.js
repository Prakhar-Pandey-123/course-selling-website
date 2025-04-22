const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
//Inside the User.js file (which is inside the routes/ folder), you define the routes for different user-related operations like signup, login, resetPassword, and changePassword. These routes are grouped together in a router.
//In your index.js file, you then import this router and give it a name (userRoutes in this case). You then "mount" this router onto a specific path (like /api/v1/auth), meaning all the routes inside the userRoutes will be prefixed with /api/v1/auth(same prefix)
const profileRoutes=require("./routes/Profile");
const courseRoutes=require("./routes/Course");
const contactusRoutes=require("./routes/ContactUs");

const database=require("./config/database");
//By importing and running database() in index.js, you're making sure that the database connection is established before your app starts handling requests.
const cookieParser=require("cookie-parser");