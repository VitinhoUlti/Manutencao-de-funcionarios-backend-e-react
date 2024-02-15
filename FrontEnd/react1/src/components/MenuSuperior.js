import { Link } from "react-router-dom";

function MenuSuperior() {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
            <div className="container">
                <h3 className="text-light">Controle de Funcionarios</h3>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Inclusão</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/manut" className="nav-link">Manutenção</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/resumo" className="nav-link">Resumo</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default MenuSuperior;