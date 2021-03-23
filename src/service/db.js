import firebaseApp from "./firebase";
export const database = firebaseApp.database();

class DataService {
	// write
	writeUserData(name, bookData) {
		database.ref(`bookStore/${name}/`).set(bookData);
	}

	// getData loading
	getUserData(update) {
		// return database.ref(`bookStore/`).once("value");
		database.ref(`bookStore/`).on("value", async (snapshot) => {
			const val = snapshot.val();
			snapshot.val() && (await update(val));
		});
	}

	// update
	getUpdateData(tableLine, name, emailName) {
		const updates = {
			...tableLine[name],
			rental: emailName,
		};
		database.ref(`bookStore/${name}`).update(updates);
	}

	// remove
	removeData(name) {
		database.ref(`bookStore/${name}`).remove();
	}
}

export default DataService;
