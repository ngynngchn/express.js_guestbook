import fs from "fs";

// read json-file
export function readFile() {
	return new Promise((resolve, reject) => {
		fs.readFile("./entries.json", (err, data) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				resolve(JSON.parse(data.toString()));
				// return file content as an json object
			}
		});
	});
}
// write into json-file
export function writeFile(data) {
	return new Promise((resolve, reject) => {
		//JSON.stringify(data, null,2) -> convert data into json string
		// (null) is used to exclude any properties from the output that have null values
		// (2) specifies that the output should be indented with two spaces for better readability
		fs.writeFile("./entries.json", JSON.stringify(data, null, 2), (err) => {
			if (err) reject(err);
			else {
				resolve("Received new data!"); // success message
			}
		});
	});
}

// add data to json-file
export function appendFile(newEntry) {
	return new Promise((resolve, reject) => {
		// to append content, we need to read the current content first
		readFile()
			.then((currentEntries) => {
				// create a new array(updatedData) which contains the read currentEntries and append the newEntry to the new array
				const updatedData = [...currentEntries, newEntry];
				// now we have to write the updated content into the json-file
				writeFile(updatedData)
					.then(() => resolve(updatedData))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
}
