import express from "express";
import {
	getAllMovies,
	getSpecificMovie,
	addMovie,
	updateMovie,
	deleteMovie,
} from "../controllers/movie.js";

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", addMovie);
router.get("/:id", getSpecificMovie);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
