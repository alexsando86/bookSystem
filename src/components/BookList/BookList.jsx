import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./BookList.module.css";

const BookList = ({ authService }) => {
	const history = useHistory();
	const onLogout = () => {
		authService.logout();
	};

	useEffect(() => {
		authService.onAuthChange((user) => {
			if (!user) {
				history.push("/");
			}
		});
	}, []);

	return (
		<section className={styles.booklist}>
			bookList
			<button type="button" onClick={onLogout}>
				로그아웃
			</button>
		</section>
	);
};

export default BookList;
