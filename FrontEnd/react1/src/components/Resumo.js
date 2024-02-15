import {useState, useEffect} from "react";
import {Chart} from "react-google-charts";
import {inAxios} from "../config_axios";

const Resumo = () => {
    const [resumo, setResumo] = useState([]);
    const [grafico, setGrafico] = useState([]);
    const [sexoGrafico, setSexoGrafico] = useState([]);

    const ObterDados = async () => {
        try{
            const dadosResumo = await inAxios.get("http://localhost:3001/amigos/idade/resumo");
            setResumo(dadosResumo.data);

            const dadosGrafico = await inAxios.get("http://localhost:3001/amigos/idade/grafico");
            const arrayGrafico = [["idade", "Quant"]];
            dadosGrafico.data.map((dado) => arrayGrafico.push([dado.idade.toString(), dado.total]));
            setGrafico(arrayGrafico);

            const sexoGrafico = await inAxios.get("http://localhost:3001/amigos/sexo/grafico");
            const arraySexoGrafico = [["sexo", "Quant"]];
            sexoGrafico.data.map((dado) => arraySexoGrafico.push([dado.sexo.toString(), dado.total]));
            setSexoGrafico(arraySexoGrafico);
        }catch(error){
            alert(`Erro... Não foi possivel obter os dados: ${error}`)
        }
    }
    useEffect(() => {
        ObterDados();
    }, []);

    return (
        <div className="container">
            <h4 className="mt-3">Resumo</h4>
            <span className="btn btn-outline-primary btn-lg">
                <p className="badge bg-danger">{resumo.num}</p>
                <p>Numero de Funcionarios</p>
            </span>
            <span className="btn btn-outline-primary btn-lg mx-2">
                <p className="badge bg-danger">{resumo.soma}</p>
                <p>Soma das idades dos funcionarios</p>
            </span>
            <span className="btn btn-outline-primary btn-lg me-2">
                <p className="badge bg-danger">{resumo.maior}</p>
                <p>Maior idade</p>
            </span>
            <span className="btn btn-outline-primary btn-lg">
                <p className="badge bg-danger">{resumo.media}</p>
                <p>Media da idade dos funcionarios</p>
            </span>

            <div className="d-flex justify-content-center">
                <Chart width={1000} height={420} chartType="ColumnChart" loader={<div>Carregando Grafico....</div>} data={grafico} options={{
                    title: "Total de Funcionarios por idade",
                    chartArea: {width: "80%"},
                    hAxis: { title: "Idades"},
                    vAxis: { title: "Quantidade de funcionarios por idade"},
                    legend: { position: "none"}
                }} />
            </div>

            <div className="d-flex justify-content-center">
                <Chart width={1000} height={420} chartType="ColumnChart" loader={<div>Carregando Grafico....</div>} data={sexoGrafico} options={{
                    title: "Total de Funcionarios por gênero",
                    chartArea: {width: "80%"},
                    hAxis: { title: "Gêneros"},
                    vAxis: { title: "Quantidade de funcionarios por gênero"},
                    legend: { position: "none"}
                }} />
            </div>
        </div>
    );
}
export default Resumo;
