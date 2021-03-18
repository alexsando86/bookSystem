import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./BookList.module.css";

const BookList = ({ authService, dataService }) => {
	const [tableLine, setTableLine] = useState({});
	const [emailName, setEmailName] = useState("");
	const [currentBookName, setCurrentBookName] = useState("");
	const history = useHistory();

	// 로그아웃
	const onLogout = () => {
		authService.logout();
	};

	// 체크박스 선택시 행 class add
	// 체크시 현재 선택된 도서의 name값을 넘겨줌.
	const onCheck = (e, name) => {
		e.target.closest("tr").classList.toggle(styles.check);
		e.target.checked && setCurrentBookName(name);
	};

	// 도서추가로 페이지이동
	const onBookAdd = () => {
		history.push('/Make')
	};

	// 도서삭제
	const onRemoveBook = () => {
		dataService.removeData(currentBookName);
	}

	// 로그인 상태체크 및 user email 가져오기
	useEffect(() => {
		authService.onAuthChange((user) => {
			setEmailName(user?.email);
			if (!user) {
				history.push("/");
			}
		});
	}, [authService, history]);

	// 페이지 처음 로딩시 데이터 가져오기
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		dataService.getUserData(update => {
			setTableLine(update);
			setIsLoading(true);
		})
	}, [dataService,isLoading])

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
						{
							// isLoading &&
							Object.keys(tableLine)?.map((key) => {
								const { name, publisher, publisherDate} = tableLine[key];
								return <TableList key={key} name={name} publisher={publisher} publisherDate={publisherDate} emailName={emailName} onCheck={onCheck} />
							})
						}
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
				<button type="button" className={styles.removeBook} onClick={onRemoveBook}>
					도서삭제
				</button>
				<button type="button" className={styles.logoutBox} onClick={onLogout}>
					로그아웃
				</button>
			</div>
		</section>
	);
};

const TableList = ({name, publisher, publisherDate, emailName, onCheck}) => {
	return (
		<tr>
			<td>
				<input className={styles.checkbox} type="checkbox" name="check" onClick={(e) => { onCheck(e, name)}} />
			</td>
			<td>{name}</td>
			<td>{publisher}</td>
			<td>{publisherDate}</td>
			<td>
				<span className={styles.stateBook}></span>
			</td>
		</tr>
	)
};

export default BookList;
