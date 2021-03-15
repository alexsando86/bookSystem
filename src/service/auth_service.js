import firebaseApp from "./firebase";

class AuthService {
	// Join
	newJoin(email, password) {
		return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
		// .then((user) => {
		// 	console.log("New Join Success");
		// 	console.log(user);
		// })
		// .catch((error) => {
		// 	var errorCode = error.code;
		// 	var errorMessage = error.message;
		// 	console.log(errorCode, errorMessage);
		// });
	}

	// Login
	login(email, password) {
		return firebaseApp.auth().signInWithEmailAndPassword(email, password);
	}

	// onAuthChange Check
	onAuthChange(onUserChanged) {
		firebaseApp.auth().onAuthStateChanged((user) => {
			onUserChanged(user);
		});
	}

	// Logout
	logout() {
		firebaseApp.auth().signOut();
	}
}

export default AuthService;
