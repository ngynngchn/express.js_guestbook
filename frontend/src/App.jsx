import { useEffect, useState } from "react";
import InputForm from "./components/InputForm.jsx";
import Entry from "./components/Entry.jsx";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
	// Initialize a state variable called `entries` using the `useState` hook

	const [entries, setEntries] = useState([]);

	// Use the `useEffect` hook to fetch the guestbook entries from the server when the component mounts
	useEffect(() => {
		fetch("http://localhost:8787/api/getEntries")
			.then((response) => response.json()) // Parse the response as JSON
			.then((data) => setEntries(data)); // Update the `entries` state variable with the fetched data
	}, []);

	return (
		<div className="App">
			<InputForm setEntries={setEntries} />
			<div className="entry-container">
				<h3>Guestbook Entries</h3>
				{entries?.map((entry) => (
					<Entry {...entry} key={uuidv4()} />
				))}
			</div>
		</div>
	);
}

export default App;
