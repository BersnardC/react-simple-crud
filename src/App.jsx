import React, {useState} from 'react';
import shortid from 'shortid'

function App() {

  const [lista, setLista] = useState([])
  const [tarea, setTarea] = useState('')
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const sendTask = (e) => {
    e.preventDefault();
    if (tarea.trim() === '') {
      setError('Ingrese nombre de tarea')
    } else {
      setLista([...lista, {id: shortid.generate(), tarea}])
      //e.target.reset();
      setTarea('');
      setError(null)
    }
  }

  const deleteTarea = (id) => {
    const arrayFiltrado = lista.filter(item => item.id !== id);
    setLista(arrayFiltrado);
    console.log(id)
  }

  const editarTarea = item => {
    setTarea(item.tarea)
    setId(item.id)
    setEdicion(true);
    setError(null)
    console.log(item)
  }

  const editTask = e => {
    e.preventDefault();
    if (tarea && id) {
      const arrEdited = lista.map(item => item.id === id ? {id, tarea} : item)
      setLista(arrEdited)
      setTarea('')
      setId('')
      setEdicion(false)
      setError(null)
    } else {
      setError('Ingrese nombre de tarea')
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crud Reactjs</h1>
      <hr/>
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              lista.length > 0 ? (
                lista.map( (item, index) => (
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.tarea}</span>
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick= {() => deleteTarea(item.id)}
                      >
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick = { () => editarTarea(item) }
                      >
                      Editar
                    </button>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-danger">Listado vacío</li>
              )              
            }
          </ul>
        </div>
        <div className="col-md-4">
          <h4 className="text-center">{ !edicion ? 'Agregar Tarea' : 'Editar Tarea'}</h4>
          <form action="" className="" onSubmit={!edicion ? sendTask : editTask}>
            {
              error ? (<span className="text-danger">{error}</span>) : ''
            }
            <input 
              value = {tarea}
              onChange = { e => setTarea(e.target.value)}
              type="text" 
              className="form-control mb-2" 
              placeholder="Ingrese tarea"/>
            {
              !edicion ? (
                <button type="submit" className="btn btn-block btn-dark">Agregar</button>
              ) : (
                <button type="submit" className="btn btn-block btn-warning">Editar</button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
