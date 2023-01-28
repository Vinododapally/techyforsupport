import React from "react";
import "../../Styles/header.css"
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
        window.location.reload();
    }

    return (
        <div>
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-100">
                </ul>
                <div class="col-md-3 text-end">
                    <button onClick={logout} type="button" class="btn btn-primary">Logout</button>
                </div>
                <div >
                    <button onClick={logout} type="button" class="btn btn-primary">Logout</button>
                </div>
            </header>
        </div>
    );

}

export default Header;