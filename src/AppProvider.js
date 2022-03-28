import React, { useState } from "react";
import AppContext from "./AppContext";

export default function AppProvider(props) {

    const [loading, setLoading] = useState(false);
    const value = {loading, setLoading}
 
	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	);
}
