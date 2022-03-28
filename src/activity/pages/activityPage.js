import React from "react";
import { useParams } from "react-router-dom"; 
import Activity from "../components/activity";

export default function ActivityPage() {
 
	const { id } = useParams();
	  
	return (
		<section className="page">
			<div className="header-page">
				<h1>Activity {id}</h1>
			</div>
			 <Activity id={id} />
		</section>
	);
}
