import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../Login/Login";
import styles from "./Join.module.css";

const Join = ({ authService }) => {
	const history = useHistory();
	const goToHome = () => {
		history.push("/");
	};
	const [joinUser, setJoinUser] = useState({
		joinID: "",
		joinPW: "",
	});

	const [alertMsg, setAlertMsg] = useState({
		error: "",
		success: "",
	});

	const onChange = (e) => {
		setJoinUser({
			...joinUser,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		authService
			.newJoin(joinUser.joinID, joinUser.joinPW)
			.then((data) => {
				// alert("New Join Success");
				setAlertMsg({
					...alertMsg,
					success: "Success full",
				});
				setTimeout(() => {
					history.push("/Login");
				});
			})
			.catch((error) => {
				// alert(error.message);
				setAlertMsg({
					...alertMsg,
					error: error.message,
				});
			});
	};

	return (
		<>
			<div className={styles.joinWrap}>
				<h1 className={styles.title}>회원가입</h1>
				<button type="button" className={styles.home} onClick={goToHome}>
					홈으로
				</button>
				<form onSubmit={onSubmit}>
					<div className={styles.join_input}>
						<input placeholder="EMAIL" type="text" name="joinID" onChange={onChange} />
					</div>
					<div className={styles.join_input}>
						<input placeholder="PASSWORD" type="password" name="joinPW" onChange={onChange} />
					</div>
					<div className={styles.alertMessageError}>{alertMsg.error}</div>
					<div className={styles.alertMessageSccess}>{alertMsg.success}</div>
					<button type="submit" className={styles.submit}>
						회원가입
					</button>
				</form>
			</div>
		</>
	);
};

export default Join;
