import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Img from "../Assets/author.jpg"
import Sidenav from "../Components/Sidenav";
import Avatar from 'react-avatar';
import {Navigate } from 'react-router-dom';

function Auther() {

    const  user = JSON.parse(localStorage.getItem('@user'));
    if (user===null) {
        return <Navigate  to={{ pathname: '/', }}></Navigate >
    }

    return (
        <div className="App">
                <Header />
                <Sidenav />
                <br/> <br/> <br/>
                 <Avatar alt="Remy Sharp" src={Img} round={true} size={250}  className="mx-auto d-block"/>
                 <div  style={{ marginLeft: '470px'}} >
                    <label style={{ color: 'red'}}>Name:</label><p>Vinod Odapally</p>
                    <label style={{ color: 'red'}}>Designation:</label><p >Software Engineer</p>
                    <label style={{ color: 'red'}}>Summary:</label><p >Dedicated and efficient full stack developer (Angular,React,NodeJs,Java with all the Db's) with 6+ years experience in application layers, presentation layers, and databases. Certified in both F/E and B/E technologies. Spearheaded successful transition from LAMP stack to MEAN which cut latency by 40% and increased effectiveness of database administrators by 20%. Seeking to further improve HTML5 and CSS3 skills as the future full stack developer at CBRE.</p>
                    <label style={{ color: 'red'}}>linkedin Profile: </label><a href="https://www.linkedin.com/in/vinod-odapally-java-developer"> Visit</a><br></br>
                    <label style={{ color: 'red'}}>For more Details visit here: </label><a href="https://odapallyvinod.wixsite.com/techyforsupport"> Hit me</a> 
                </div>
        </div>
    );
}

export default Auther;