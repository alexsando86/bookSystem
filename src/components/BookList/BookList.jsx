import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./BookList.module.css";

const BookList = ({ authService }) => {
	const [emailName, setEmailName] = useState("");
	const history = useHistory();
	const onLogout = () => {
		authService.logout();
	};

	useEffect(() => {
		authService.onAuthChange((user) => {
			setEmailName(user?.email);
			if (!user) {
				history.push("/");
			}
		});
	}, []);

	return (
		<section className={styles.booklist}>
			{emailName !==null && (
				<h1 className={styles.user}>
					<span>{emailName}</span> 님 환영합니다.
				</h1>
			)}
			<div className={styles.bookBox}>
				<ul className={styles.bookList}>
					<li>자바스크립트 개론</li>
				</ul>
			</div>
			<div className={styles.buttonBox}>
				<button type="button" className={styles.addBook}>
					도서추가
				</button>
				<button type="button" className={styles.logoutBox} onClick={onLogout}>
					로그아웃
				</button>
			</div>
		</section>
	);
};

export default BookList;
