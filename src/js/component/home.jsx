import React from "react";
import ToDoList from "./toDoList.jsx"

//create your first component
const Home = () => {
	return (
		<div className="container p-5">
			<h1 className="text-center">Todo Lists For Today</h1>
			<ToDoList />
		</div>
	);
};

export default Home;