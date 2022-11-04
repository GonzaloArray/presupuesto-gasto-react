import { useState, useEffect } from 'react';
import { Mensaje } from './Mensaje';
import CerraBtn from '../img/cerrar.svg';

export const Modal = ({setModal, animarModal, setAnimarModal, guardarGastos, gastosEditar, setGastosEditar}) => {

    const [message, setMessage] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        if(Object.keys(gastosEditar).length > 0){
            // seteamos en el modal
            setNombre(gastosEditar.nombre);
            setCantidad(gastosEditar.cantidad);
            setCategoria(gastosEditar.categoria);
            setId(gastosEditar.id);
            setFecha(gastosEditar.fecha);
        }
    }, [])

    const handleOcultar = () =>{
        setAnimarModal(false)
        setGastosEditar(false)

        setTimeout(() => {
            setModal(false)

        }, 300);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes("")) {
            setMessage("Todos los campos son obligatorios");

            setTimeout(() => {
                setMessage('');
            }, 2000);
            return;
        }

        guardarGastos({nombre, cantidad, categoria, fecha, id});
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerraBtn}
                    alt="Cerrar Moodal"
                    onClick={handleOcultar}
                />
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastosEditar.nombre ? "Gasto a editar": "Nuevo Gasto"}</legend>
                {message && <Mensaje tipo="error">{message}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">{gastosEditar.nombre ? "Editando Gasto": "Nombre Gasto"}</label>

                    <input
                        type="text"
                        id='nombre'
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        type="number"
                        id='cantidad'
                        placeholder='Añade la cantidad del gasto, ej: 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">------ Seleccione ------</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastosEditar.nombre ? "Guardar cambios": "Nuevo Gasto"} />
            </form>
        </div>
    )
}
