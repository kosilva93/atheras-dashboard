import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import logo from "src/assets/images/atheras-logo.png";
import { setUserSession, useFormInput } from "src/api/utils";
import apiAuth from "src/api/authentication";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";

const Login = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = useFormInput("");
  const password = useFormInput("");

  // Handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    apiAuth
      .login({ email: email.value, password: password.value })
      .then((response) => {
        // API call to authenticate the user
        setLoading(false);
        // Set the user session information. Storing the token and refresh token in sessionStorage
        setUserSession(response.data.access_token, response.data.refresh_token);
        // Take the user to Dashboard page
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.data.message);
      });
  };

  // const api = new Api();

  // const fetchUser = () => {
  //   api.getUserList().then((response) =>
  //   console.log(response)).catch((err) =>
  //   console.log(err));
  // };

  return (
    <div>
      <CRow className="justify-content-top">
        <img src={logo} alt="Logo" />
      </CRow>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard
                  className="p-4 c-app:color"
                  style={{ background: "#88a5ce" }}
                >
                  {/* <CCard className="p-4 c-app:color"> */}
                  <CCardBody>
                    <CForm>
                      <h1 style={{ color: "white" }}>Login</h1>
                      {/* <h1 style={{ color: '#29479e' }}>Login</h1> */}
                      <p className="dialog-text">Sign In to your account</p>
                      {/* <p className="text-muted">Sign in to your account</p> */}
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          {...email}
                          placeholder="Email"
                          autoComplete="email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          {...password}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <p className="text-muted">
                        <a href="http://127.0.0.1:3000/#/register">
                          Register here
                        </a>
                      </p>
                      <p className="text-muted">
                        <a href="http://127.0.0.1:3000/#/forgot_password">
                          Forgot password
                        </a>
                      </p>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            block
                            color="primary"
                            className="px-0"
                            value={loading ? "Loading..." : "Login"}
                            onClick={handleLogin}
                            disabled={loading}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton
                            block
                            color="dark"
                            className="px-4"
                            onClick={() => history.push(`/login`)}
                          >
                            Cancel
                          </CButton>
                        </CCol>
                      </CRow>
                      <br />
                      {error && (
                        <>
                          <label style={{ color: "#bd0d00" }}>
                            ERROR: {error}
                          </label>
                          <br />
                        </>
                      )}
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default Login;
