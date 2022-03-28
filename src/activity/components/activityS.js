import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../assets/images/map.jpeg";

export default function Activity(props) {
	let activity = props.data;

	const history = useNavigate()

	const goback = () => {
		history("/activities");
	};
	
	return (
		<div>
			<h4>{activity.title}</h4>
			<div>
				<div>{activity.description}</div>
				<div>{activity.url}</div>
				<div>{activity.latitude}</div>
				<div>{activity.longitude}</div>
				<div><img src={map} alt="map"></img></div>
			</div>
			<button className="form-button">Back</button>
		</div>
	);
}
