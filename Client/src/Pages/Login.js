import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commonConfig from "../config/commonConfig.json";

toast.configure();
function Login({logado=false}) {
  const notifyS = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
  };

  const notifyE = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
  };
  
  const navigate = useNavigate();
  const handleLogin = (values) => {
    Axios.post(commonConfig.SERVER_URL+"/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response) {
        localStorage.setItem('@user', JSON.stringify(response.data[0]));
        console.log('======='+JSON.stringify(response.data[0]));
        notifyS("Login successfull enjoy now");
        navigate('/dashboard')
        window.location.reload();
      } else {
        notifyE(response.data.msg);
      }

    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("email invalid")
      .required("please enter email Id"),
    password: yup
      .string()
      .min(8, "password must be 8 characters atleast")
      .required("please enter password"),
  });

  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            <div className="user-link-cad">
              {!logado && <Link to="/register"> Don't have one? Register</Link>}
            </div>
          </div>
          <h1>Techy Team</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
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
              <button className="button" type="submit">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;