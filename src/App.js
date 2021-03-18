import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList/BookList";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import Make from "./components/Make/Make";

function App({ authService, dataService }) {
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
					<Route path="/Login">
						<Login authService={authService} />
					</Route>
					<Route path="/BookList">
						<BookList authService={authService} dataService={dataService} />
					</Route>
					<Route path="/Make">
						<Make authService={authService} dataService={dataService} />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
