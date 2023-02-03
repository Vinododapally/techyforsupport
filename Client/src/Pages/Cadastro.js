import "../Styles/cadastro.css"
import Img from "../Assets/result.svg"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commonConfig from "../config/commonConfig.json";

toast.configure();
function Cadastro({ logado = false }) {

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

    const navigate = useNavigate();
    const handleRegister = (values) => {
        Axios.post(commonConfig.SERVER_URL+"/register", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            if(response){
            notifyS(response.data.msg);
            navigate('/')
            //window.location.reload();
            }else{
                notifyE(response.data.msg);
            }
        });
    };

    const validationsRegister = yup.object().shape({
        email: yup
            .string()
            .email("E-mail invalid")
            .required("email id is required"),
        password: yup
            .string()
            .min(8, "Password must be atleast 8 characters")
            .required("please enter password"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "password does not match")
            .required("Password must be atleast 8 characters"),
    });


    return (
        <div className="body">
            <div className="left-cadastro">
                <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
            </div>
            <div className="right-cadastro">
                <div className="card-cadastro">
                    <div className="user-links">
                        <div className="user-link-home">
                            {!logado && <Link to="/">Already have one? Login</Link>}
                        </div>
                    </div>
                    <h1>Techy Team</h1>
                    <Formik
                        initialValues={{}}
                        onSubmit={handleRegister}
                        validationSchema={validationsRegister}
                    >
                        <Form className="login-form">
                            <div className="form-group">
                                <label form="email">Email</label>
                                <Field name="email" type='email' className="form-field" placeholder="Email" />
                                <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"
                                />
                            </div>

                            {/*Outro campo*/}

                            <div className="form-group">
                                <label form="email">Password</label>
                                <Field name="password" type='password' className="form-field" placeholder="Password" autoComplete="on"/>

                                <ErrorMessage
                                    component="span"
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            {/*Confirmação*/}

                            <div className="form-group">
                                <label form="email">Confirm Password</label>
                                <Field name="confirmation" type='password' className="form-field" placeholder="Confirm Password" autoComplete="on"/>

                                <ErrorMessage
                                    component="span"
                                    name="confirmation"
                                    className="form-error"
                                />
                            </div>
                            <button className="button" type="submit">
                                Register
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;