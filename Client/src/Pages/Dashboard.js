import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Img from "../Assets/tech.jpg"
import ImageShadow from 'react-image-shadow';
import Sidenav from "../Components/Sidenav";

function HomePage() {


    return (
        <div className="App">
                <Header />
                <Sidenav />
                <br/>
                 <ImageShadow  src={Img}  height={400} width= {800}  className="rounded mx-auto d-block"/>&nbsp;
        </div>
    );
}

export default HomePage;