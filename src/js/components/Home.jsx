// url para solicitar las tareas por hacer
// hacer una peticion a la API al cargar el componente con useEffect
// Mostrar en la UI el listado de tareas

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
			fetch("https://playground.4geeks.com/todo/todos/jg_list",{
				method:"POST",
				body: JSON.stringify({
					"label":newTodo,
						"is_done":false
					}),
				headers:{
					"Content-Type":"application/json"
				}
			})
			.then((response)=> response.json())
			//.then((data)=> console.log(data))

			setNewTodo("");
			fetch("https://playground.4geeks.com/todo/users/jg_list")
			.then((response)=> response.json())
			.then((data)=> setTodoList(data.todos))
			//setTodoList([...todoList,newTodo]);
		}
		console.log([...todoList,newTodo]);
	}
	const handleDelete = (taskId)=> {
		//setTodoList(todoList.filter((item,idx)=> idx !== taskId ));
		fetch("https://playground.4geeks.com/todo/todos/"+taskId,{
			method : "DELETE"
		})
		.then((response) => {
			if(response.ok){
				console.log("Tarea Eliminada")
				fetch("https://playground.4geeks.com/todo/users/jg_list")
				.then((response)=> response.json())
				.then((data)=> setTodoList(data.todos))
			}
		})
		//console.log("Eliminar elemento");
	}
	//console.log(newTodo);

const panic= async ()=>{
		fetch("https://playground.4geeks.com/todo/users/jg_list",{
			method:"DELETE"
		})
		.then( async (response)=>{
			if(response.ok){
				console.log("Eliminacion correcta")
				await fetch("https://playground.4geeks.com/todo/users/jg_list",{
					method:"POST",
					headers:{
						"Content-Type":"application/json"
					}
				})
			}
		}).then(async ()=>{
			 await fetch("https://playground.4geeks.com/todo/users/jg_list")
				.then((response)=> response.json())
				.then((data)=> setTodoList(data.todos)
				)
		})
	}
	useEffect(()=>{
		fetch("https://playground.4geeks.com/todo/users/jg_list")
		.then((response)=> response.json())
		.then((data)=> setTodoList(data.todos))
	},[])

	
	return (
		<div className="card-box-space">
			
			<div className="text-center card-box">
					
				<h2 className="text-center mt-5 display-5 fw-lighter"><i className="fa-solid fa-list"></i> todos</h2>
				<p className="display-1">
				</p>
				<div className="wrapper" id="container">
				<ul>
					<li><input 
					type="text" 
					placeholder="What need to be done" 
					className="d-flex justify-between py-3 px-5 w-100 bg-light border-bottom border-1"
					value={newTodo}
					onChange={((e)=>setNewTodo(e.target.value))}
					onKeyDown ={(e)=>(handleKeyPress(e))}
					/>
					</li>
					
					{
						todoList.map((item)=>(
							<li key={item.id}
							className="d-flex justify-between py-2 px-5 w-100 border-bottom border-1 position-relative bg-light" 
							onMouseOver={()=>(setFlagDelete(item.id))}
							onMouseLeave={()=>(setFlagDelete(null))}
							><span className="py-2">{item.label}</span>
								{ flagDelete === item.id && <small className="mx-3 text-end position-absolute top-50 end-0 translate-middle-y" onClick={()=>(handleDelete(item.id))}> x </small>}
								{/*<small className="mx-3 text-end position-absolute top-50 end-0 translate-middle-y" onClick={()=>(handleDelete(idx))}> x </small>*/}

							</li>
						))
					}
					<li className="card-footer d-flex justify-between py-1 px-2 w-100 border-bottom border-1 position-relative bg-light">{(todoList.length === 0 ? "No hay tareas" : todoList.length + " tareas") }</li>
				<span className="stack d-flex justify-between py-1 px-2 border-bottom border-1 position-relative bg-light"></span>
				<span className="stack-2 d-flex justify-between py-1 px-2 border-bottom border-1 position-relative bg-light"></span>
				</ul>
				</div>
			</div>
			<button className="button button-danger" onClick={()=>panic()}>PANIC</button>
		</div>
	);
};

export default Home;