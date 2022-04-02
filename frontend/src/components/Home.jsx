import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./home.module.css"

export const Home = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8000/books")
			.then(function (response) {
				setBooks(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	const handleDelete = async (id) => {
		console.log(id);
		const data = await axios.delete(`http://localhost:8000/books/${id}`);
		console.log(data);
		window.location.reload(false);
	};

	return (
		<div className={styles.homeMain}>
			{books.map((el) => {
				return (
					<div className={styles.homeMain2} key={el._id}>
						<div>
							<div className={styles.title}>{el.title}</div>
							<div className={styles.author}>
								{el.author_id.name}
							</div>
							<div>
								<img
									style={{ height: "300px", width: "100%" }}
									src={el.book_front_image_url}
									alt=""
								/>
							</div>

							<button className={styles.deletebtn} onClick={() => handleDelete(el._id)}>
								Delete
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
