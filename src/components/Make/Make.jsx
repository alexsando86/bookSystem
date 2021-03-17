import React, {useState} from 'react';
import styles from './Make.module.css';

const Make = () => {
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
	return (
		<div className={styles.makeWrap}>
			<h1 className={styles.title}>도서추가</h1>
			<div className={styles.form}><input className={styles.input} type="text" name="name" value={bookData.name} placeholder="책이름" onChange={onChange} /></div>
			<div className={styles.form}><input className={styles.input} type="text" name="publisher" value={bookData.publisher} placeholder="출판사" onChange={onChange} /></div>
			<div className={styles.form}><input className={styles.input} type="date" min="1950-01-01" max="9999-12-31" name="date" onChange={onChange} /></div>
			<button type="button" className={styles.addButton}>추가</button>
		</div>
	)
}

export default Make
