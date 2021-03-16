import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./BookList.module.css";

const BookList = ({ authService, dataService }) => {
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
	};

	// 도서추가
	const [bookData, setBookData] = useState({
		name: "",
		publisher: "",
		date: "",
	});
	const onChange = (e) => {
		setBookData({
			...bookData,
			[e.target.name]: e.target.value,
		});
	};
	const onBookAdd = () => {
		dataService.writeData(bookData.name, bookData);
	};

	return (
		<section className={styles.booklist}>
			{emailName !== null && (
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
							<td>
								<input className={styles.checkbox} type="checkbox" name="check" onClick={onCheck} />
							</td>
							<td>자바스크립트 개론</td>
							<td>금성출판사</td>
							<td>2021.03.16</td>
							<td>
								육선도 <span className={styles.stateBook}>(대여중)</span>
							</td>
						</tr>
						<tr>
							<td>
								<input className={styles.checkbox} type="checkbox" name="check" onClick={onCheck} />
							</td>
							<td>
								<input className={styles.input} type="text" name="name" value={bookData.name} onChange={onChange} />
							</td>
							<td>
								<input className={styles.input} type="text" name="publisher" value={bookData.publisher} onChange={onChange} />
							</td>
							<td>
								<input className={styles.input} type="date" min="1950-01-01" max="9999-12-31" name="date" onChange={onChange} />
							</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={styles.buttonBox}>
				<button type="button" className={styles.rental}>
					빌려가기
				</button>
				<button type="button" className={styles.addBook} onClick={onBookAdd}>
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
