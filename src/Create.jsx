import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Create() {

    const [name, setName] = useState('')
    

    function handleSubmit(e) {
        e.preventDefault()
        
        const newName = e.target.name.value
        

        fetch('http://localhost:8000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        })
            .then(response => response.json())
            .then(() => {
                alert('Categoria creada con éxito')
                setName('')
                e.target.reset() 
            })
            .catch(error => {
                alert('Error al crear la categoria: ' + error)
            })
    }

    return (
        <div className='d-flex row justify-content-center mt-5'>
            <h1 className="fw-bold">Crear categoria</h1>            
            <hr />

            <div className='d-flex justify-content-center mt-'>
                <Link to="/" className="btn btn-primary btn-lg mb-3 w-50 fw-bold">
                    <i className="bi bi-arrow-left-square-fill me-2"></i>
                    Volver
                </Link>
            </div>

            <form onSubmit={handleSubmit} className='d-flex row gap-3 justify-content-center'>
                <div className="form-group">
                    <label htmlFor="name">Nombre de la categoria: </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-auto fw-bold">Crear</button>
            </form>
        </div>
    )
}