import { useState } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../config_axios";

function Inclusao(){
    const {register, handleSubmit, reset} = useForm();
    const [aviso, setAviso] = useState("");

    const salvar = async (campos) => {
        try{
            const response = await inAxios.post("http://localhost:3001/amigos", campos);
            setAviso(`Ok! Funcionario Cadastrado! Id: ${response.data.id}`)
        }catch(error){
            setAviso(`Funcionario não cadastrado.....: ${error}`)
        }

        setTimeout(() => {
            setAviso("");
        }, 5000);

        reset({nome: "", idade: "", sexo: ""});
    }

    return (
        <div className="container">
            <h4 className="fst-italic mt-3">Inclusão</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group ">
                    <label htmlFor="nome" >Nome: </label>
                    <input type="text" id="nome" required autoFocus {...register("nome")} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="idade">Idade: </label>
                    <input type="number" id="idade" required autoFocus {...register("idade")} />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="sexo">Genero(M ou F): </label>
                    <input type="text" id="sexo" required autoFocus {...register("sexo")} />
                </div>
                <input type="submit" className="btn btn-primary mt-3" value="Enviar" />
                <input type="reset" className="btn btn-primary mt-3 ms-3" value="Limpar" />
            </form>
            <div>
                {aviso}
            </div>
        </div>
    )
}
export default Inclusao;