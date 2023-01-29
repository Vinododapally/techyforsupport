import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Img from "../Assets/load.jpg"
import ImageShadow from 'react-image-shadow';
import Sidenav from "../Components/Sidenav";

function Projects() {


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