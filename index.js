const express = require("express");

const { writeError } = require("./app/errService");

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/err1", (req, res) => {
	throw "This is an error message";
});

app.get("/err2", async (req, res) => {
	const response = await writeError("Server responded with error");
	if (response) {
		res.send({
			success: 0,
			message: "Server responded with error"
		});
	}
});

app.get("/err3", async (req, res) => {
	const response = await writeError("Internal Error");
	if (response) {
		res.status(500).send({
			success: 0,
			message: "Internal Error"
		});
	}
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
