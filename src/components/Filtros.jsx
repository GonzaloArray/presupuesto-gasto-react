import React from 'react'
import { useEffect, useState } from 'react'

export const Filtros = ({ filtro, setFiltro }) => {
    // const [first, setfirst] = useState(second)

    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label >Filtrar Gastos</label>
                    <select value={filtro} onChange={e => setFiltro(e.target.value)}>
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
            </form>
        </div>
    )
}
