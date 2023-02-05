import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Img from "../Assets/program.jpeg"
import ImageShadow from 'react-image-shadow';
import Sidenav from "../Components/Sidenav";
import {Navigate } from 'react-router-dom';

function Services() {

    const  user = JSON.parse(localStorage.getItem('@user'));
    if (user===null) {
        return <Navigate  to={{ pathname: '/', }}></Navigate >
    }
    
    return (
        <div className="App">
                <Header />
                <Sidenav />
                <br/>
                <h3 style={{color:'white',paddingLeft: '320px'}}>What do you think we serve?</h3>
                <h3 style={{color:'white', paddingLeft: '500px'}}>common man you are in right platform</h3>
                <h3 style={{color:'white',paddingLeft: '650px'}}>just tell us the business, will surprice you!!</h3>
                 <ImageShadow  src={Img}  height={550} width= {900}  className="rounded mx-auto d-block"/>&nbsp;
        </div>
    );
}

export default Services;