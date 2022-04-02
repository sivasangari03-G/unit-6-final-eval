import React from 'react'
import styles from "./home.module.css";

export const Login = () => {

  return (
		<div className={styles.forflex}>
			<a className={styles.login} href="http://localhost:8000/auth/google">Login</a>
		</div>
  );
}
