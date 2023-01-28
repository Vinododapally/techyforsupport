import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "../Pages/Login"
import Dashboard from "../Pages/Dashboard"
import Cadastro from "../Pages/Cadastro";

const logado = localStorage.getItem('@user');

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {logado && <Route path="/dashboard" exact element={<Dashboard logado={logado}/>} />}
                {!logado && <Route path="/" element={<Login logado={logado} />} />}
                {!logado && <Route path="/register" element={<Cadastro logado={logado} />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;