import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import logo from '../../../assets/images/atheras-logo.png'; // Tell webpack this JS file uses this image
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
  CRow
} from '@coreui/react'

import * as userActions from '../../../store/users';
import { useDispatch } from 'react-redux';

const Login = (props) => {
  //const store = configureStore();
  const dispatch = useDispatch();

  const history = useHistory()
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
        dispatch(userActions.userAdded({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
          }))
        props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      setError(error.data.message);
    });
  };

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
                        <a href="/#/register">
                          Register here
                        </a>
                      </p>
                      <p className="text-muted">
                        <a href="/#/forgot_password">
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
