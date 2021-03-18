import firebaseApp from "./firebase";

class AuthService {
	// Join
	newJoin(email, password) {
		return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
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
