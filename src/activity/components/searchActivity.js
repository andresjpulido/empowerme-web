import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchActivity(props) {
	const [queryInput, setQueryInput] = useState({ query: "" });
	const history = useNavigate();

	const goNewActivity = () => {
		history("/activity");
	};

	const search = () => {
		if (queryInput.query) props.search("?title=" + queryInput.query);
		else props.search("");
	};

	const handleChange = (ev) => {
		ev.persist();
		setQueryInput({ ...queryInput, [ev.target.name]: ev.target.value });
	};
	console.log(props);

	return (
		<div> 
			<div>
				<input
					name="query"
					id="query"
					type="text"
					value={queryInput.query}
					onChange={handleChange}
				></input>
				<button className="form-button" onClick={search}>
					Search
				</button>
			</div>
			<button className="form-button" onClick={goNewActivity}>
				New
			</button>
		</div>
	);
}
