import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList/BookList";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import AuthService from "./service/auth_service";

const authService = new AuthService();

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<Login authService={authService} />
					</Route>
					<Route path="/Join">
						<Join authService={authService} />
					</Route>
					<Route path="/BookList">
						<BookList authService={authService} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
