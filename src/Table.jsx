import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Table() {
    const [datos, setDatos] = useState([]);
    const [editCategory, setEditCategory] = useState({ name: '', id: '' });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/category')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function borrar(id) {
        fetch(`http://localhost:8000/api/category/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                alert('Categoría eliminada con éxito');
                setDatos(datos.filter(dato => dato.id !== id));
            })
            .catch(error => {
                alert('Error al eliminar la categoría:' + error);
            });
    }
    

    function handleModalOpen(category) {
        setEditCategory(category);
        setShowModal(true);
    }

    function handleModalClose() {
        setShowModal(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setEditCategory({ ...editCategory, [name]: value });
    }

    function actualizar(e) {
        e.preventDefault();

        fetch(`http://localhost:8000/api/category/${editCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCategory)
        })
            .then(response => response.json())
            .then(() => {
                alert('Categoría actualizada con éxito');
                setDatos(datos.map(dato => (dato.id === editCategory.id ? editCategory : dato)));
                handleModalClose();
            })
            .catch(() => {
                alert('Error al actualizar la categoría');
            });
    }

    return (
        <div className='d-flex row justify-content-center mt-5'>
            <h1 className="fw-bold">Categorias</h1>            
            <hr />

            <div className='d-flex justify-content-center mt-'>
                <Link to="/create" className="btn btn-primary btn-lg mb-3 w-50 fw-bold">
                    <i className="bi bi-plus-square-fill me-2"></i>
                    Crear categoria
                </Link>
            </div>

            <table className="table w-50">
                
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th className='text-end'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato, index) => (
                        <tr key={index}>
                            <td>{dato.id}</td>
                            <td className=''>{dato.name}</td>
                            <td className='d-flex gap-2 justify-content-end'>
                                <button className="btn btn-danger fw-bold" onClick={() => borrar(dato.id)}>Borrar</button>
                                <button className="btn btn-success fw-bold" onClick={() => handleModalOpen(dato)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Actualizar Categoría</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={actualizar}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nombre</label>
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
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary fw-bold">Guardar cambios</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bold" onClick={handleModalClose}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}