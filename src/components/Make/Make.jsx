import React, {useState} from 'react';
import { useHistory } from 'react-router';
import styles from './Make.module.css';

const Make = ({authService, dataService}) => {
	// 도서추가
	const [bookData, setBookData] = useState({
		name: "",
		publisher: "",
		publisherDate: "",
		rental:'',
	});

	// name값에 대한 value를 지정 후 bookData에 저장.
	const onChange = (e) => {
		setBookData({
			...bookData,
			[e.target.name]: e.target.value,
		});
	};

	// 도서목록으로 이동하기
	const goToBookList = () => {
		history.push('/BookList');
	}

	// DB에 값 저장하기 후 페이지 이동.
	const history = useHistory();
	const writeDatabase = () => {
		if(bookData.name && bookData.publisher ){
			dataService.writeUserData(bookData.name.replace(/\./g, '%2E'),  bookData);
			goToBookList();
		} else {
			alert('값을 입력하세요')
		}
	}

	return (
		<div className={styles.makeWrap}>
			<h1 className={styles.title}>도서추가</h1>
			<div className={styles.form}><input className={styles.input} type="text" name="name" value={bookData.name} placeholder="책이름" onChange={onChange} /></div>
			<div className={styles.form}><input className={styles.input} type="text" name="publisher" value={bookData.publisher} placeholder="출판사" onChange={onChange} /></div>
			<div className={styles.form}><input className={styles.input} type="date" min="1950-01-01" max="9999-12-31" name="publisherDate" onChange={onChange} /></div>
			<div className={styles.buttonBox}>
				<button type="button" className={styles.addButtonPrev} onClick={goToBookList}>이전</button>
				<button type="button" className={styles.addButton} onClick={writeDatabase}>추가</button>
			</div>
		</div>
	)
}

export default Make
