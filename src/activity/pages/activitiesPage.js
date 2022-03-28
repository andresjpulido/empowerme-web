import React, { useEffect, useState } from "react";
import ActivityList from "../components/activityList";
import Error from "../../commons/components/error";
import constants from "../../constants";
import SearchActivity from "../components/searchActivity";
import AppContext from "../../AppContext";

export default function Activities() {
	const [activities, setActivities] = useState(null); 	 
	const [error, setError] = useState(null);
	const {loading, setLoading} = React.useContext(AppContext);
	const api_key = process.env.REACT_APP_API_KEY;
	let url = constants.URL_ACTIVITY;

	let search = async (query) => {
		setLoading(true);
		
		const res = await fetch(url + query).catch((error) => {
			console.log(error);
			setActivities({
				error: { code: "net", message: "ERR_NAME_NOT_RESOLVED" },
			});
		});

		if (res) {
			const data = await res.json();
			console.log(data);
			setActivities(data);
		}
		setLoading(false);
	};

	useEffect(() => {
		search("");
	}, [url]);

 
	if (activities && activities.error) {
		return (
			<Error code={activities.error.code} message={activities.error.message} />
		);
	}
 
	return (
		
		<section className="page">
			<div className="header-page">
				<h1>Activities</h1>
			</div>

			<SearchActivity search={search} />
			<ActivityList activities={activities} />
			 
		</section>
	);
}