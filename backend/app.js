import express from "express";
import cors from "cors";
import morgan from "morgan";
import { body, validationResult } from "express-validator";

// import functions
import { appendFile, readFile } from "./helper.js";

const PORT = 8787;
const app = express();

// middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));

// handle GET request "/api/getEntries"
app.get("/api/getEntries", (req, res) => {
	//promise returns file content as object
	readFile()
		.then((data) => res.json(data))
		.catch((err) => console.log(err));
});

// handle post request "/api/addEntry"
app.post("/api/addEntry", body("fname").isString(), (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() });
	}
	// extract content of post request from body
	const data = req.body;
	// add new Entries to entries.json
	appendFile(data)
		.then((updatedData) => res.json(updatedData))
		.catch((err) => console.log(err));
});

app.listen(PORT, () => console.log("The server is running on PORT", PORT));
