import React, { useState } from 'react'
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const addTask = (e) => {
    e.preventDefault()
    if(isEmpty(task)){
      console.log("task empty")
      return
    }
    const newTask = {
      id: shortid.generate(),
      name: task
    }
    setTasks([...tasks, newTask])
    console.log(newTask)
    console.log(tasks)
    setTask("")
  }

  const saveTask = (e) => {
    e.preventDefault()
    if(isEmpty(task)){
      console.log("task empty")
      return
    }
    
    const editedTask = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTask)
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          {
            size(tasks) > 0 ? (
            <ul className="list-group">
              {
                tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <span classname="lead">{task.name}</span>
                    <button 
                      className="btn btn-danger btn-sm float-right"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning btn-sm float-right mx-2"
                      onClick={() => editTask(task)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              }
            </ul>) : <h5 className="text-center mt-5">No hay tareas pendientes</h5>
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Editando Tarea" : "Agregar Tarea"}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button 
              className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
              type="submit"
            >{editMode ? "Editar" : "Agregar"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
