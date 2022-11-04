import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles  } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [percentage, setPercentage] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        // Total
        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPercentage(nuevoPorcentaje);
        }, 700);

    }, [gastos])


    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if (resultado) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar styles={buildStyles({
                    pathColor: percentage > 100 ? 'red':'#3b92f6',
                    traiColor: '#f5f5f5',
                    textColor: percentage > 100 ? 'red':'#3b92f6'

                })}
                value={percentage} text={`${percentage}% Gastado`} />
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>
                        Prespuesto:
                    </span>
                    {' '} {formatearPresupuesto(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>
                        Disponible:
                    </span>
                    {' '} {formatearPresupuesto(disponible)}
                </p>
                <p>
                    <span>
                        Gastado:
                    </span>
                    {' '} {formatearPresupuesto(gastado)}
                </p>
            </div>
        </div>
    )
}
