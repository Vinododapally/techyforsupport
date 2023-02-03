import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Img from "../Assets/tech.jpg"
import useravtar from "../Assets/useravtar.jpg"
import techbot from "../Assets/techbot.jpg"
import ImageShadow from 'react-image-shadow';
import Sidenav from "../Components/Sidenav";
import ChatBot from 'react-simple-chatbot';

function HomePage() {

    const steps = [
        {
            id: '0',
            message: 'Welcome to techy bot chat...!!',
            trigger: '1',
        }, {
            id: '1',
            message: ' Hey buddy!, May I know your name?',
            trigger: '2'
        }, {
            id: '2',
            user: true,
            trigger: '3',
        }, {
            id: '3',
            message: " Hello {previousValue}, how can I help you?",
            trigger: 4
        }, 
        {
            id: '4',
            message: "Hold on, did you visted our web site?",
            trigger: 5
        }, 
        {
            id: '5',
            message: "If not please visit, will get know our tech stack and other stuff...",
            trigger: 6
        },
        {
            id: '6',
            component: (
                <div><a href="https://odapallyvinod.wixsite.com/techyforsupport">Hit Me! I will drag u there</a> </div>
              ),
              asMessage: true,
            trigger: 7
        },
        {
            id: '7',
            message: " And please leve your details here, you ll be contacted soon by our team mean while be ready with requiremet!!!",
            trigger: 8
        },
        {
            id: '8',
            user: true,
            trigger: 9
        }, {
            id: '9',
            message: "Got it and Thank's have a nice chat with you bye bye",
            trigger: 8
        },
    ];

    // Set some properties of the bot
const config = {
    floating: true,
};


    return (
        <div className="App">
                <Header />
                <Sidenav />
                <ChatBot headerTitle="Techy Bot"
                speechSynthesis={{ enable: true, lang: 'en' }} 
                steps={steps} botAvatar= {techbot} userAvatar= {useravtar} {...config}/>
                <br/>
                 <ImageShadow  src={Img}  height={400} width= {800}  className="rounded mx-auto d-block"/>&nbsp;
        </div>
    );
}

export default HomePage;