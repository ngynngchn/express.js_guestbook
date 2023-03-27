import React from "react";

function Entry({ ...entry }) {
	return (
		<div>
			<h3>{entry.title}</h3>
			<p>
				{entry.fname}, {entry.lname}
			</p>
			<p>{entry.email}</p>
			<p>{entry.message}</p>
		</div>
	);
}

export default Entry;
