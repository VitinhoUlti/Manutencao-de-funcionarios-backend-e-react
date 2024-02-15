import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import { useForm } from "react-hook-form";
import ItemLista from "./ItemLista";

const Manutenção = () => {
    const [amigos, setAmigos] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const obterLista = async ()  => {
        try{
            const lista = await inAxios.get("http://localhost:3001/amigos");
            setAmigos(lista.data);
        }catch(error){
            alert(`Erro...... Não foi possivel obter os dados : ${error}`);
        }
    }

    useEffect(() => {obterLista()}, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await inAxios.get(`http://localhost:3001/amigos/filtro/${campos.palavra}`);
            lista.data.length ? setAmigos(lista.data) : alert("Não há funcionarios com essa palavra chave");
        }catch (error){
            alert(`Erro...... Não foi possivel obter os dados : ${error}`);
        }
    }

    const excluir = async (id, titulo) => {
        if(!window.confirm(`Confirma a exclusão de "${titulo}"?`)){
            return;
        }
        try{
            await inAxios.delete(`http://localhost:3001/amigos/${id}`);
            setAmigos(amigos.filter((amigo) => amigo.id !== id));
        }catch(error){
            alert(`Não foi possivel a exclusão.... ${error}`);
        }
    }

    const alterar = async (id, titulo, index) => {
        const novaIdade = Number(prompt(`Informe a nova idade do "${titulo}"`));
        if(isNaN(novaIdade) || novaIdade < 1){
            return;
        }
        try {
            await inAxios.put(`http://localhost:3001/amigos/${id}`, {idade: novaIdade});
            const amigosAlteracao = [...amigos];
            amigosAlteracao[index].idade = novaIdade;
            setAmigos(amigosAlteracao);
        }catch (error) {
            alert(`Não foi possivel alterar a idade... ${error}`);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Manutenção</h4>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Titulo ou autor" required {...register("palavra")}/>
                            <input type="submit" className="btn btn-primary" value="Pesquisar" />
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => {reset({palavra: ""}); obterLista();}}/>
                        </div>
                    </form>
                </div>
            </div>
            
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Gênero</th>
                    </tr>
                </thead>
                <tbody>
                    {amigos.map((amigo, index) => (
                        <ItemLista key={amigo.id} id={amigo.id} nome={amigo.nome} idade={amigo.idade} sexo={amigo.sexo} excluirClick={() => excluir(amigo.id, amigo.nome)} alterarClick={() => alterar(amigo.id, amigo.nome, index)}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Manutenção;