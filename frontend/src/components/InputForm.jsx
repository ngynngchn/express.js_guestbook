import { useState } from "react";

// This component takes a `setEntries` prop which is a function to update the parent component's state
function InputForm({ setEntries }) {
	// Initialize state variables using the `useState` hook
	const [fname, setFname] = useState();
	const [lname, setLname] = useState();
	const [email, setEmail] = useState();
	const [title, setTitle] = useState();
	const [message, setMessage] = useState();

	// This function is called when the user submits the form
	function handleSubmit(event) {
		// Prevent the default form submission behavior, which would cause a page reload
		event.preventDefault();
		// Construct a new message object from the form field values
		const newMessage = {
			fname,
			lname,
			email,
			title,
			message,
		};
		// Send the new message object to the server
		fetch("http://localhost:8787/api/addEntry", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newMessage), // turn JavaScript object to a JSON string
		})
			.then((response) => response.json()) // Parse the response as JSON
			.then((data) => {
				setEntries(data); // Update the parent component's state with the new data
				console.log(data);
			});
	}

	return (
		// Render a form with input fields and a submit button
		<div className="InputForm">
			<h1>Devil Ray Guestbook</h1>
			<p>Thank you for visiting Devil Ray! Leave a Message before you go! :)</p>
			<form>
				<input
					type="text"
					name="fname"
					id="fname"
					placeholder="First Name"
					onChange={(e) => setFname(e.target.value)}
				/>
				<input
					type="text"
					name="lname"
					id="lname"
					placeholder="Last Name"
					onChange={(e) => setLname(e.target.value)}
				/>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Your Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					name="message"
					id="message"
					cols="30"
					rows="10"
					placeholder="Your message ..."
					onChange={(e) => setMessage(e.target.value)}></textarea>
			</form>
			<button onClick={handleSubmit}>Send Message!</button>
		</div>
	);
}

export default InputForm;
