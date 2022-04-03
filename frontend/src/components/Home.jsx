import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./home.module.css";

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
		// console.log(id);
		const data = await axios.delete(`http://localhost:8000/books/${id}`);
		// console.log(data);
		window.location.reload(false);
	};

	const [data, setData] = useState({});

	const handleData = (e) => {
		const { name, value } = e.currentTarget;

		setData({
			...data,
			[name]: value,
		});
	};	
	
	const handleAdd = async () => {
		const obj = {};
		obj.title = data.title;
		obj.author_id = "62481d3d1fe6f13ee796aaff";
		obj.book_front_image_url = data.book_front_image_url;

		// console.log(data, data2);
		console.log(obj);

		await axios.post(`http://localhost:8000/books`,obj);
	}

	return (
		<>
			<div>
				<input
					name="title"
					type="text"
					placeholder="title"
					value={data.title}
					onChange={handleData}
				/>
				<input
					name="author_id"
					type="text"
					placeholder="author"
					value={data.author}
					onChange={handleData}
				/>
				<input
					name="book_front_image_url"
					type="text"
					placeholder="book"
					value={data.book}
					onChange={handleData}
				/>
				<button onClick={handleAdd}>ADD</button>
			</div>
			<div className={styles.homeMain}>
				{books.map((el) => {
					console.log(el.author_id);
					return (
						<div className={styles.homeMain2} key={el._id}>
							<div>
								<div className={styles.title}>{el.title}</div>
								<div className={styles.author}>
									{el.author_id.name}
								</div>
								<div>
									<img
										style={{
											height: "300px",
											width: "100%",
										}}
										src={el.book_front_image_url}
										alt=""
									/>
								</div>

								<button
									className={styles.deletebtn}
									onClick={() => handleDelete(el._id)}
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
