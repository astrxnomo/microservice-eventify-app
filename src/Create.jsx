import { useState } from 'react'

export default function Create() {

    const [name, setName] = useState('')
    

    function handleSubmit(e) {
        e.preventDefault()
        
        // Obtén los valores del formulario usando los setters
        const newName = e.target.name.value
        

        fetch('http://localhost:8000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        })
            .then(response => response.json())
            .then(data => {
                alert('Categoria creada con éxito')
                setName('')
                e.target.reset() 
            })
            .catch((error) => {
                alert('Error al crear la categoria')
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>
    )
}