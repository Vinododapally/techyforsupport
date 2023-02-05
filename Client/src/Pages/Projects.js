import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Img from "../Assets/load.jpg"
import ImageShadow from 'react-image-shadow';
import Sidenav from "../Components/Sidenav";
import {Navigate } from 'react-router-dom';

function Projects() {

    const  user = JSON.parse(localStorage.getItem('@user'));
    if (user===null) {
        return <Navigate  to={{ pathname: '/', }}></Navigate >
    }

    return (
        <div className="App">
                <Header />
                <Sidenav />
                <br/>
                 <ImageShadow  src={Img}  height={550} width= {550}  className="rounded mx-auto d-block"/>&nbsp;
        </div>
    );
}

export default Projects;