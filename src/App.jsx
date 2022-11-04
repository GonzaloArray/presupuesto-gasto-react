import { useEffect, useState } from 'react'
import { Filtros } from './components/Filtros'
import { Header } from './components/Header'
import { ListadoGastos } from './components/ListadoGastos'
import { Modal } from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

    // Le pasamos el valor incial que localstorage tenga almacenado
    const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto') ?? 0)
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
    const [modal, setModal] = useState(false)
    const [animarModal, setAnimarModal] = useState(false)
    const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [])
    const [gastosEditar, setGastosEditar] = useState({})
    const [filtro, setFiltro] = useState("")
    // Para que no pierda la referencia en gastos cuando filtremos por categoria, vamos a hacerle un backup a la informacion
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() => {

        if(Object.keys(gastosEditar).length > 0){
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true)
            }, 300);
        }

    }, [gastosEditar])

    // gastos para presupuesto
    useEffect(()=> {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto])

    // Gastos para localstorage
    useEffect(()=> {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos])

    // Cambios guardados para presupuesto
    useEffect(()=> {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, [])

    useEffect(()=> {
        if (filtro) {
            // filtrar gastos por categoria
            const filtrandoCategoria = gastos.filter(gasto => gasto.categoria === filtro)

            setGastosFiltrados(filtrandoCategoria);
        }
    }, [filtro])


    const handleNuevoGasto = () => {
        setModal(true);
        setGastosEditar({});

        setTimeout(() => {
            setAnimarModal(true)
        }, 300);
    }

    const guardarGastos = (gasto) => {

        if (gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
            setGastos(gastosActualizados);
            setGastosEditar({});
        }else{
            // Nuevo Gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }


        setModal(false);

        setTimeout(() => {
            setAnimarModal(false)
        }, 300);

    }

    const eliminarGasto = id => {
        const gastosFiltrados = gastos.filter(gasto => gasto.id !== id)

        setGastos(gastosFiltrados);
    }
    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros filtro={filtro} setFiltro={setFiltro} />
                        <ListadoGastos
                            gastos={gastos}
                            gastosEditar={gastosEditar}
                            setGastosEditar={setGastosEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>
                    <div className='nuevo-gasto'>
                        <img
                            src={IconoNuevoGasto}
                            alt="Icono nuevo gasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal &&
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGastos={guardarGastos}
                    gastosEditar={gastosEditar}
                    setGastosEditar={setGastosEditar}
                />}

        </div>
    )
}

export default App
