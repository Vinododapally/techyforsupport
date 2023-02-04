import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "../Pages/Login"
import Dashboard from "../Pages/Dashboard"
import Cadastro from "../Pages/Cadastro";
import Services from "../Pages/Services";
import Projects from "../Pages/Projects";
import ChangePassword from "../Pages/ChangePassword";
import UploadProfile from "../Pages/UploadProfile";
import Auther from "../Pages/Auther";
const logado = localStorage.getItem('@user');

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {!logado && <Route path="/" element={<Login logado={logado} />} />}
                {!logado && <Route path="/register" element={<Cadastro logado={logado} />} />}
                {logado && <Route path="/changepassword" exact element={<ChangePassword logado={logado}/>} />}
                {logado && <Route path="/uploadprofile" exact element={<UploadProfile logado={logado}/>} />}
                {logado && <Route path="/dashboard" exact element={<Dashboard logado={logado}/>} />}
                {logado && <Route path="/services" exact element={<Services logado={logado}/>} />}
                {logado && <Route path="/projects" exact element={<Projects logado={logado}/>} />}
                {logado && <Route path="/author" exact element={<Auther logado={logado}/>} />}
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;