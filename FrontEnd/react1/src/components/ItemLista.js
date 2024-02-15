const ItemLista = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.nome}</td>
            <td>{props.idade}</td>
            <td>{props.sexo}</td>
            <td className="text-center">
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={props.excluirClick}>&#10008;</i>
                <i className="altera text-success fw-bold ms-2" title="Alterar" onClick={props.alterarClick}>&#36;</i>
            </td>
        </tr>
    )
}
export default ItemLista;