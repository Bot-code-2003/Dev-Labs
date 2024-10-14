import express, { urlencoded } from "express";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
const uri =
  "mongodb+srv://dharmadeep:nebula-lab-1@nebula-lab-1.3uiz2.mongodb.net/?retryWrites=true&w=majority&appName=nebula-lab-1";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/user", userRoutes);
app.use("/project", projectRoutes);

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log("Database connected. Server Running"))
  )
  .catch((err) => console.log(err));
