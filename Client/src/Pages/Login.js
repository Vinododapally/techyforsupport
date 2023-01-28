import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg"
import { Link, useNavigate } from 'react-router-dom';

const loca_api = "http://localhost:8080"
const remote_api = "http://techyforsupport-env.eba-y3nm7sqv.ap-northeast-1.elasticbeanstalk.com:8080"

function Login({logado=false}) {
  const navigate = useNavigate();
  const handleLogin = (values) => {
    Axios.post(loca_api+"/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      const page = response.data;
      if (page === true) {
        localStorage.setItem('@user', JSON.stringify(response.config.data));
        navigate('/dashboard')
        window.location.reload();
      } else {
        alert(response.data.msg);
      }

    });
  };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (logado === true) {
//         navigate("/login")
//     }
// }, [logado, navigate]);
  

  const handleRegister = (values) => {
    Axios.post(loca_api+"/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
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

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("email invalid")
      .required("please enter email Id"),
    password: yup
      .string()
      .min(8, "password must be 8 characters atleast")
      .required("please enter password"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "password does not match")
      .required("please enter confirm password"),
  });

  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <div className="user-links">
            {/* <div className="user-link-home">
              {!logado && <Link to="/">Home</Link>}
            </div> */}

            <div className="user-link-cad">
              {!logado && <Link to="/register"> Dont have one? Register</Link>}
            </div>
          </div>
          <h1>Sign in</h1>
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