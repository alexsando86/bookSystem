import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ authService }) => {
	const [alertMsg, setAlertMsg] = useState('');
	const history = useHistory();
	const goToBookList = (userId) => {
		history.push({
			pathname: "/BookList",
			state: { id: userId },
		});
	};

	const goToJoin = () => {
		history.push("/Join");
	};

	const [value, setValue] = useState({
		userId: "",
		userPassword: "",
	});

	const onChange = (event) => {
		setValue({
			...value,
			[event.target.name]: event.target.value,
		});
	};

	const onLogin = (event) => {
		event.preventDefault();
		authService.login(value.userId, value.userPassword).then((data) => goToBookList(data.user.uid)).catch(error => {
			setAlertMsg(error.message);
		});
	};

	// 로그인유지하기
	useEffect(() => {
		authService.onAuthChange((user) => {
			user && goToBookList(user.uid);
		});
	});

	return (
		<>
			<h1 className={styles.title}>Book Store</h1>
			<div className={styles.loginBox}>
				<form onSubmit={onLogin}>
					<div className={styles.inputBox}>
						<input type="text" placeholder="ID" name="userId" value={value.userId} onChange={onChange} />
					</div>
					<div className={styles.inputBox}>
						<input type="password" placeholder="PASSWORD" name="userPassword" value={value.userPassword} onChange={onChange} />
					</div>
					<p className={styles.errorMessage}>{alertMsg}</p>
					<button type="submit" className={styles.submit}>
						로그인
					</button>
				</form>
			</div>
			<button type="button" className={styles.newjoin} onClick={goToJoin}>
				회원가입
			</button>
		</>
	);
};

export default Login;
