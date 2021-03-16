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

	const onCheck = (e) => {
		e.target.closest("tr").classList.toggle(styles.check);
	}

	return (
		<section className={styles.booklist}>
			{emailName !==null && (
				<h1 className={styles.user}>
					<span>{emailName}</span> 님 환영합니다.
				</h1>
			)}
			<div className={styles.bookBox}>
				<table className={styles.bookListTbl}>
					<thead>
						<tr>
							<th className={styles.checked}></th>
							<th className={styles.bookName}>책이름</th>
							<th className={styles.publisher}>출판사</th>
							<th className={styles.date}>발행일</th>
							<th className={styles.status}>대여여부</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input className={styles.checkbox} type="checkbox" name="check" onClick={onCheck} /></td>
							<td>자바스크립트 개론</td>
							<td>금성출판사</td>
							<td>2021.03.16</td>
							<td>육선도 <span className={styles.stateBook}>(대여중)</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={styles.buttonBox}>
				<button type="button" className={styles.rental}>
					빌려가기
				</button>
				<button type="button" className={styles.addBook}>
					도서추가
				</button>
				<button type="button" className={styles.removeBook}>
					도서삭제
				</button>
				<button type="button" className={styles.logoutBox} onClick={onLogout}>
					로그아웃
				</button>
			</div>
		</section>
	);
};

export default BookList;
