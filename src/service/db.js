import firebaseApp from "./firebase";
export const database = firebaseApp.database();

class DataService {
	// write
	writeUserData(name, bookData) {
		database.ref(`bookStore/${name}/`).set(bookData);
	}

	// getData
	getUserData(update) {
		// return database.ref(`bookStore/`).once("value");
		database.ref(`bookStore/`).on("value", async (snapshot) => {
			snapshot.val() && (await update(snapshot.val()));
		});
	}

	removeData(name) {
		database.ref(`bookStore/${name}`).remove();
	}
}

export default DataService;
