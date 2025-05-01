import React,{useEffect, useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todoList,setTodoList] = useState(["ARR Tralalear 1 poco","ARR Tralalear algo"]);
	const [newTodo,setNewTodo] = useState("");
	const [flagDelete,setFlagDelete] = useState(null);
	const handleKeyPress = (e)=> {
		if (e.key === "Enter"){
			setTodoList([...todoList,newTodo]);
			setNewTodo("");
		}
		console.log([...todoList,newTodo]);
	}
	const handleDelete = (taskId)=> {
		setTodoList(todoList.filter((item,idx)=> idx !== taskId ));
		console.log("Eliminar elemento");
	}
	//console.log(newTodo);
	return (
		<div className="text-center">
				
			<h1 className="text-center mt-5 display-1"><i className="fa-solid fa-list"></i> Todos</h1>
			<p className="display-1">
			</p>
			<div className="wrapper" id="container">
			<ul>
				<li><input 
				type="text" 
				placeholder="What need to be done" 
				className="rounded-3"
				value={newTodo}
				onChange={((e)=>setNewTodo(e.target.value))}
				onKeyDown ={(e)=>(handleKeyPress(e))}
				/>
				</li>
				
				{
				todoList.map((item,idx)=>(
						<li key={idx}
						className="d-flex justify-between" 
						onMouseOver={()=>(setFlagDelete(idx))}
						onMouseLeave={()=>(setFlagDelete(null))}
						><span>{item}</span>
							{ flagDelete === idx && <small className="mx-5 text-end" onClick={()=>(handleDelete(idx))}> x </small>}
						</li>
					))
				}

				<li className="display-6">{(todoList.length === 0 ? "No hay tareas" : todoList.length + " tareas") }</li>
			</ul>
			</div>
		</div>
	);
};

export default Home;