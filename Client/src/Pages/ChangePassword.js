import "../Styles/login.css"
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import Img from "../Assets/result.svg"
import { Link, useNavigate } from 'react-router-dom';

const loca_api = "http://localhost:8080"
const remote_api = "http://techyforsupport-env.eba-y3nm7sqv.ap-northeast-1.elasticbeanstalk.com:8080"

function ChangePassword() {
  const navigate = useNavigate();
 
  const handleRest = (values) => {
    const  user = JSON.parse(localStorage.getItem('@user'));

    Axios.post(loca_api+"/changepassword", {
      email: JSON.stringify(user.email),
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    }).then((response) => {
      if (response.data.msg) {
        navigate('/dashboard')
        window.location.reload();
      } else {
        alert("Technical error")
      }

    });
  };

  const validationsChangePassword = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, "password must be 8 characters atleast")
      .required("please enter password"),
    newPassword: yup
      .string()
      .min(8, "password must be 8 characters atleast")
      .required("please enter new password"),
    repeatNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "password does not match")
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
          </div>
          { <Link to="/dashboard">Changed your mind? Cancel</Link>}
          <h1>Change Password</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleRest}
            validationSchema={validationsChangePassword}
          >
            <Form className="login-form">

              <div className="form-group">
                <label form="email">Current Password</label>
                <Field name="currentPassword" type='password' className="form-field" placeholder="Current Password" autoComplete="on"/>
                <ErrorMessage
                  component="span"
                  name="currentPassword"
                  className="form-error"
                />
              </div>

              <div className="form-group">
                <label form="email">New Password</label>
                <Field name="newPassword" type='password' className="form-field" placeholder="New Password" autoComplete="on"/>
                <ErrorMessage
                  component="span"
                  name="newPassword"
                  className="form-error"
                />
              </div>

           
              <div className="form-group">
                <label form="email">Confirm New Password</label>
                <Field name="repeatNewPassword" type='password' className="form-field" placeholder="Confirm New Password" autoComplete="on"/>
                <ErrorMessage
                  component="span"
                  name="repeatNewPassword"
                  className="form-error"
                />
              </div>

              <button className="button" type="submit">
                Change Password
              </button>
             
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;