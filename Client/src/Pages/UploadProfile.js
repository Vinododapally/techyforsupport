import React from "react";
import '../Styles/dashboard.css';
import Header from "../Components/header/header"
import Sidenav from "../Components/Sidenav";
import Axios from "axios";
import {useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commonConfig from "../config/commonConfig.json";
import {useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

toast.configure();
function UploadProfile() {
    const navigate = useNavigate();
    const notifyS = (msg) => {
        toast.success(msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      };
    
      const notifyE = (msg) => {
        toast.error(msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });
      };
      
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
      const  user = JSON.parse(localStorage.getItem('@user'));
      const [preview, setPreview] = useState(user.file_path)
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        var objectUrl = URL.createObjectURL(e.target.files[0])
        setPreview(objectUrl)
      };
 
      const uploadFile = async (e) => {
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("email", user.email);
        try {
          const res = await Axios.post(
            commonConfig.SERVER_URL+"/upload",
            formData
          );
          if(res.data[0]){
            localStorage.setItem('@user', JSON.stringify(res.data[0]));
            notifyS("Profile uploaded successfully!");
            navigate('/dashboard')
          } else{
            notifyE(res.data.msg);
          }
        } catch (ex) {
          console.log(ex);
        }
      };

    return (
        <div className="App">
                <Header/>
                <Sidenav />
                <br/><br/>
                <div  style={{ marginLeft: '500px',backgroundColor: "white", height: '400px', width: '500px'}}>
                    <br></br>
                    <br></br>
                    <div style={{ marginLeft: '30px'}}><input type="file" onChange={saveFile} />
                     <button onClick={uploadFile} class="btn btn-danger">Upload</button></div>
                     <br></br>
                     <br></br>
                     <br></br>
                     <div style={{ marginLeft: '170px'}}><Avatar alt="Remy Sharp" src={preview} round={true} size={150}/></div>
                     <div style={{ marginLeft: '60px',marginTop: '40px',color: "#9900FF"}}>Email Id: {user.email}</div>
                </div>
                {/* </div> */}
                
        </div>
    );
}

export default UploadProfile;