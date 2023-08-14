import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	//establecemos 2 estados, uno para la lista y otro que sera el que guarde el valor del input
	const [value,setValue]=useState("")
	const [ToodoList,setToodoList]=useState(undefined)
	const [stateCountTodo,setStateCountTodo] = useState("")
	// este estado lo que hara es fijarse si el componente esta en su pseudoclase hover para colocar el boton de eliminar
	const [hover,setHover] = useState({state:false,ref:undefined})

	const styleInput = {
	borderBottom: "none",
	width:"100%",
	position: "relative",
	display: "block",
	padding: "var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x)",
	color: "var(--bs-list-group-color)",
	textDecoration: "none",
	backgroundColor: "var(--bs-list-group-bg)",
	border: "var(--bs-list-group-border-width) solid var(--bs-list-group-border-color)"
	}


	// funcion que traiga todas las tareas
	const TraesTodos = ()=> {
		try {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/RodrigoO',{
			method:"GET",
			headers: {
			"Content-Type": "application/json"
			}
		})
		.then((response) => response.json())
		.then((datos) => {
			setToodoList(datos)
		})
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(()=> {
		TraesTodos()
	},[])

	useEffect(()=> {
		if(ToodoList === undefined) {
			setStateCountTodo(0)
		}else {
			setStateCountTodo(ToodoList.length)
		}
		
	},[ToodoList])


	// Fetch para crear un nuevo Todo 
	const InsertarTodo = (lista)=> {
		try {
			fetch("https://playground.4geeks.com/apis/fake/todos/user/RodrigoO",{
				method:"PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body:JSON.stringify(lista)
			})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log("arriba dice si se inserto o no")
			})

		} catch (error) {
			console.log(error)
		}
	}
	const addToList = (e)=> {
		e.preventDefault()
		if(value !== "") {
			setToodoList([...ToodoList,{
				done: false,
				label: value
			}])
			setValue("")
		}

	}
	const EliminarTodo = (indexElement)=> {
		const newArr = ToodoList.filter((todo,index)=> {
			return index !== indexElement
		})
		setToodoList(newArr)
	}

	const ActualizarEstado = (state,ref)=> {
		setHover({
			state:state,
			ref:ref
		})
	}


	return (
		<div className="container">
			<div className="row">
				<div className="col-4 m-auto">
					<h1 className="text-center opacity-50" style={{fontSize:"50px"}}>todos</h1>
					<ul className="list-group">
					<form onSubmit={addToList} action="">
    					<input type="text" className="btnInput" value={value} onChange={(e) => setValue(e.target.value)} style={styleInput} placeholder="Ingrese una tarea"/>
					</form>
					{
						ToodoList !== undefined?
						ToodoList.map((todo,index)=> {
							return <li key={index} onMouseEnter={()=> ActualizarEstado(true,index)} onMouseLeave={()=> ActualizarEstado(false,index)} className="list-group-item d-flex flex-row justify-content-between">
								<p className="p-0 m-0">{todo.label}</p>
								{
									(hover.state === true && hover.ref === index) &&  <p role="button" onClick={()=> EliminarTodo(index)} className="p-0 m-0 text-danger opacity-50">X</p>
								}

							</li>
						}) : 
						<li className="list-group-item">No hay Tareas.</li>
					}
					<li className="list-group-item"><p className="p-0 m-0 opacity-50" style={{fontSize:"12px"}}>{stateCountTodo} item left</p></li>
					</ul>




				</div>
			</div>

		</div>
	);
};

export default Home;