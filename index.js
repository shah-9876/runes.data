// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Route to get rune info by runeid
app.get("/api/runes/:runeid", async (req, res) => {
	const runeId = req.params.runeid;
	const apiKey = process.env.API_KEY;

	try {
		const response = await fetch(
			`https://open-api.unisat.io/v1/indexer/runes/${runeId}/info`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();

		if (data.code === 0 && data.data) {
			res.json(data);
		} else {
			res
				.status(404)
				.json({ error: "Rune does not exist or data format is incorrect." });
		}
	} catch (error) {
		console.error("Error fetching rune data:", error);
		res.status(500).json({ error: "Error fetching data. Please try again." });
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
