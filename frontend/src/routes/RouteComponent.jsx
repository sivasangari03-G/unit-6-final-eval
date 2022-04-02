import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { Login } from "../components/Login";

export const RouteComponent = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Login />}></Route>
				<Route path="/home" element={<Home />}></Route>
			</Routes>
		</div>
	);
};
