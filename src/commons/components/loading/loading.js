import React, { useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import "./loading.css";
import loadingImg from "../../../assets/images/loading.gif";

export default function Loading() {
 
	const { loading, setLoading } = React.useContext(AppContext);

    return (
        <div className={loading?"loading-active":"loading-inactive"}>
           
            <img src={loadingImg} className="loading-gif"></img>
        </div>
    )


}
