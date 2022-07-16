import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { TodoItem } from "./TodoItem";

const KEY = "todolist-todos";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const taskRef = useRef();
  const descRef = useRef();

//
  useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(KEY));
  if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
  localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos])
//

  const agregarTarea = () => {
    const task = taskRef.current.value;
    const desc = descRef.current.value;


    //La descripcion no puede estar vacia.
    if (desc === "") return;

    setTodos((prevTodos) => {

      const newTask = {
        id: uuid(),
        task: task,
        desc:desc
      };

      return [...prevTodos, newTask];
    });

    //Actualizacion de los input se borra el contentido al agregar tarea
    taskRef.current.value = null;
    descRef.current.value = null;
  };

  const eliminarTareas = (id) => {
    const newTodos = todos.filter((todos) => todos.id !== id);
    setTodos(newTodos)
 }


  return (
    <Fragment>
      <h1>Tareas</h1>

      <div className='row align-items-center'>

        <div className="col-md-3 ">

          <div className="input-group my-4">
            <input
              ref={taskRef}
              type="text"
              placeholder="Titulo"
              className="form-control"
            />
          </div>

        </div>

        <div className="col-md-4">
          <div className="input-group my-4">
            <input
              ref={descRef}
              type="text"
              placeholder="Descripcion"
              className="form-control"
            />
          </div>
        </div>

        <div className="col-md-3">
          <input type="checkbox" id ='importante' className="form-check-input me-2"/>
          <label for="importante" className=" text-light">Importante</label>
        </div>

        <div className="col-md-2">
          <button onClick = {agregarTarea} className="btn btn-dark"> AGREGAR </button>
        </div>

      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} eliminarTodo = {eliminarTareas} ></TodoItem>
        ))}
      </ul>

    </Fragment>
  );
}
