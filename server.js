import express from "express";
import connectDB from "./database/mongodb.js";
import router from "./router/router.js";

const app = express();
app.use(express.json());

connectDB();
app.use("/", router);

app.listen(5000, () => console.log("Server running on port 5000"));
