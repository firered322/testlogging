const fs = require("fs");
const path = require("path");

exports.writeError = async function (message) {
	fs.readdir("./", (err, files) => {
		if (err) throw `Error reading the directory: ${err.message}`;
		if (files.indexOf("errors") == -1) {
			fs.mkdir(`${path.dirname(require.main.filename)}/errors`, (err) => {
				if (err) throw `Error creating errors directory: ${err}`;
				fs.appendFile(
					path.join(path.dirname(require.main.filename), "errors/errors.log"),
					message + "\n",
					(err) => {
						if (err) throw `Error in logger: ${err}`;
						console.log("Successfully logged the error");
						return true;
					}
				);
			});
		}
		fs.appendFile(
			path.join(path.dirname(require.main.filename), "errors/errors.log"),
			message + "\n",
			(err) => {
				if (err) throw `Error in logger: ${err}`;
				console.log("Successfully logged the error");
				return true;
			}
		);
	});
};
