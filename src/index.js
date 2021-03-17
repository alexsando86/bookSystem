import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthService from "./service/auth_service";
import DataService from "./service/db";

const authService = new AuthService();
const dataService = new DataService();

ReactDOM.render(
	<React.StrictMode>
		<App authService={authService} dataService={dataService} />
	</React.StrictMode>,
	document.getElementById("root")
);
