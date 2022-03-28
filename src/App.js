/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Error from "./commons/components/error";
import constants from "./constants";
import Header from "./commons/components/header";
import Home from "./commons/pages/home";
import Footer from "./commons/components/footer";
import Menu from "./commons/components/menu";
import SettingsPage from "./settings/pages/setup";
import DashboardPage from "./dashboard/pages";
import ReportsPage from "./reports/pages";
import FeedbackPage from "./feedback/pages";
import ActivitiesPage from "./activity/pages/activitiesPage";
import ActivityPage from "./activity/pages/activityPage";
import UserPage from "./user/pages/user";
import UsersPage from "./user/pages/users";

import AppProvider from "./AppProvider";
import Loading from "./commons/components/loading";

function App() {
	const [item, setItem] = useState(0);
	const [activities, setActivities] = useState(null);
	const handleItem = (item) => {
		setItem(item);
	};

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const api_key = process.env.REACT_APP_API_KEY;
	let url = constants.URL_ACTIVITY;

	useEffect(() => {
		setLoading(true);
		search();

		async function search() {
			const res = await fetch(url).catch((error) => {
				setActivities({
					error: { code: "net", message: "ERR_NAME_NOT_RESOLVED" },
				});
			});

			if (res) {
				const data = await res.json();

				setActivities(data);
			}
			setLoading(false);
		}
	}, [url]);

	if (!activities) {
		return <div>Loading ...</div>;
	}

	if (activities.error) {
		return (
			<Error code={activities.error.code} message={activities.error.message} />
		);
	}

	return (
		<AppProvider>
			<div className="App">
				<BrowserRouter>
					<Header />
					<div className="content">
						<Menu />
						<div className="app">
							<Routes>
								<Route path="/dashboard" element={<DashboardPage />} exact />

								<Route path="/reports" element={<ReportsPage />} exact />

								<Route path="/users" exact element={<UsersPage />} />
								<Route path="/user" exact element={<UserPage />} />
								<Route path="/user/:id" exact element={<UserPage />} />

								<Route path="/activities" element={<ActivitiesPage />} exact />
								<Route path="/activity/:id" element={<ActivityPage />} exact />
								<Route path="/activity" element={<ActivityPage />} exact />

								<Route path="/setup" element={<SettingsPage />} exact />
								<Route path="/feedback" element={<FeedbackPage />} exact />

								<Route element={<Home />} />
							</Routes>
						</div>
					</div>
					<Loading />
				
					<Footer />
				</BrowserRouter>
			</div>
		</AppProvider>
	);
}

export default App;
