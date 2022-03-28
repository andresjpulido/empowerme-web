import React, { useEffect, useState } from "react";
import map from "../../assets/images/map.jpeg";
import { useNavigate } from "react-router-dom";
import Error from "../../commons/components/error";
import constants from "../../constants";

export default function ActivityEdit(props) {
	let id = props.id;
	let isNew = id?false:true;

	const [activity, setActivity] = useState({
		title: "",
		url: "",
		latitude: "",
		longitude: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	let url = constants.URL_ACTIVITY;

	const history = useNavigate();

	async function create() {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			  },
			body: JSON.stringify(activity)
		},
		).catch((error) => {
			setActivity({
				error: { code: "net", message: "ERR_NAME_NOT_RESOLVED" },
			});
		});

		if (res) {
			const data = await res.json();
			console.log(data);
			setActivity(data);
		}
		setLoading(false);
	}

	async function edit() {
		const res = await fetch(url + "/" + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			  },
			body: JSON.stringify(activity)
		}).catch((error) => {
			setActivity({
				error: { code: "net", message: "ERR_NAME_NOT_RESOLVED" },
			});
		});

		if (res) {
			const data = await res.json();
			console.log(data);
			setActivity(data);
		}
		setLoading(false);
	}

	useEffect(() => {
		setLoading(true);
		search();
		async function search() {
			const res = await fetch(url + "/" + id).catch((error) => {
				setActivity({
					error: { code: "net", message: "ERR_NAME_NOT_RESOLVED" },
				});
			});

			if (res) {
				const data = await res.json();
				console.log(data);
				setActivity(data);
			}
			setLoading(false);
		}
	}, [url]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if(isNew){
console.log("creating new ")
create();
		} else{
			console.log("editing new ");edit();
		}
	};

	const goback = () => {
		history("/activities");
	};

	const handleChange = (ev) => {
		ev.persist();
		setActivity({ ...activity, [ev.target.name]: ev.target.value });
	};

	return (
		<div>
			<div>{JSON.stringify(activity)}</div>
			<div className="form">
				<div>
					<label>Title</label>
					<input
						name="title"
						id="title"
						type="text"
						onChange={handleChange}
						value={activity.title}
						placeholder="Title"
					></input>
				</div>
				<div>
					<label>Description</label>
					<input
						name="description"
						id="description"
						type="text"
						onChange={handleChange}
						value={activity.description}
						placeholder="Description"
					></input>
				</div>
				<div>
					<label>Url</label>
					<input
						name="url"
						id="url"
						type="text"
						onChange={handleChange}
						value={activity.url}
						placeholder="Url"
					></input>
				</div>
				<div>
					<label>Location</label>
					<input
						type="radio"
						value="coordinates"
						name="location"
						id="location"
					/>{" "}
					Coordinates
					<input
						type="radio"
						value="Map"
						name="location"
						naidme="location"
					/>{" "}
					Map
				</div>
				<div>
					<label>latitude</label>
					<input
						name="latitude"
						id="latitude"
						type="text"
						onChange={handleChange}
						value={activity.latitude}
						placeholder="latitude"
					></input>
				</div>

				<div>
					<label>longitude</label>
					<input
						name="longitude"
						id="longitude"
						type="text"
						onChange={handleChange}
						value={activity.longitude}
						placeholder="longitude"
					></input>
				</div>
				<div>
					<img src={map} alt="map"></img>
				</div>
			</div>
			<button className="form-button" onClick={handleSubmit}>
				Save
			</button>
			<button className="form-button" onClick={goback}>
				Cancel
			</button>
		</div>
	);
}
