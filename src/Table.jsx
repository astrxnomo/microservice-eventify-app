import { useEffect, useState } from 'react'

export default function Table() {
    const [datos, setDatos] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editCategory, setEditCategory] = useState({ name: '', id: '' })

    useEffect(() => {
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch((error) => {
                console.error('Error:', error)
            })
    }, [])

    function borrar(id) {
        fetch(`http://localhost:8000/api/category/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoria eliminada con éxito')
                setDatos(datos.filter(dato => dato.id !== id))
            })
            .catch((error) => {
                alert('Error al eliminar la categoria')
            })
    }

    function handleModalOpen(category) {
        setEditCategory(category) 
        setShowModal(true) 
    }

    function handleModalClose() {
        setShowModal(false)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setEditCategory({ ...editCategory, [name]: value }) 
    }

    function actualizar(e) {
        e.preventDefault()

        fetch(`http://localhost:8000/api/category/${editCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCategory)
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoria actualizada con éxito')
                setDatos(datos.map(dato => (dato.id === editCategory.id ? editCategory : dato)))
                handleModalClose() 
            })
            .catch((error) => {
                alert('Error al actualizar la categoria')
            })
    }

    return (
        <div>
            <h2>Listado de categorias</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato, index) => (
                        <tr key={index}>
                            <td>{dato.name}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => borrar(dato.id)}>Borrar</button>
                                <button className="btn btn-warning" onClick={() => handleModalOpen(dato)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Actualizar Categoria</h5>
                                <button type="button" className="close" onClick={handleModalClose}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={actualizar}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            name="name" 
                                            value={editCategory.name} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}