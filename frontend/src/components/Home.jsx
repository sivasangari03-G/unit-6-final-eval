import React, { useEffect, useState } from "react";
import axios from "axios";

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
		<div>
			{books.map((el) => {
				return (
					<div key={el._id}>
						<div>{el.title}</div>
						<div>{el.author_id.name}</div>
						<div>
							<img
								style={{ height: "200px", width: "150px" }}
								src={el.book_front_image_url}
								alt=""
							/>
						</div>

						<button onClick={() => handleDelete(el._id)}>
							Delete
						</button>
					</div>
				);
			})}
		</div>
	);
};
