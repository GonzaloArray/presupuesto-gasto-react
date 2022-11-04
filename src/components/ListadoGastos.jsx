import { Gasto } from "./Gasto"


export const ListadoGastos = ({ gastos, setGastosEditar, eliminarGasto, filtro, gastosFiltrados }) => {
    return (
        <div className="listado-gastos contenedor">

            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en está categoria'}</h2>
                        {
                            gastosFiltrados.map(gasto => (
                                <Gasto
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastosEditar={setGastosEditar}
                                    eliminarGasto={eliminarGasto}
                                />
                            ))
                        }
                    </>
                ) :
                    (
                        <>
                            <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                            {
                                gastos.map(gasto => (
                                    <Gasto
                                        key={gasto.id}
                                        gasto={gasto}
                                        setGastosEditar={setGastosEditar}
                                        eliminarGasto={eliminarGasto}
                                    />
                                ))
                            }
                        </>
                    )
            }
        </div>
    )
}
