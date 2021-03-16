import firebaseApp from "./firebase";
const database = firebaseApp.database();

class DataService {
	// write
	writeData(name, bookData) {
		database.ref(`bookStore/${name}/`).set(bookData);
	}
	removeData() {}
}

export default DataService;
