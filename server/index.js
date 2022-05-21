import express from "express";
import bodyParser from "body-parser";
import moviesRoutes from "./routes/movies.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const PORT = process.env.PORT | 5000;
const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/movies", moviesRoutes);

app.get("/", (req, res) => {
	res.send("welcome");
});

mongoose
	.connect(process.env.DATABASE_CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		})
	)
	.catch((error) => console.error(error.message));
