import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import logo from "src/assets/images/atheras-logo.png";
import { useFormInput } from "src/api/utils";
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

const Password = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = useFormInput("");

  const handleForgotPassword = () => {
    setError(null);
    setLoading(true);

    // API call to authenticate the user
    apiAuth
      .forgotPassword({ email: email.value })
      .then((response) => {
        setLoading(false);
        // If response is successful take the user to Dashboard page
        alert(response.data.message);
        props.history.push("/login");
      })
      .catch((error) => {
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
                {/* <CCard className="p-4 card-bg" > */}
                <CCard className="p-4" style={{ background: "#88a5ce" }}>
                  <CCardBody>
                    <CForm>
                      {/* <h1 style={{ color: '#29479e' }}>Forgot Password</h1> */}
                      <h1 className="text-white">Forgot Password</h1>
                      {/* <p className="text-muted">Please provide an email address to send the link to reset your password:</p> */}
                      <p className="text-white">
                        Please provide your registered email address. <br></br>A
                        link will be sent to reset your password:
                      </p>
                      <CInputGroup className="mb-3 shadow-sm">
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
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            block
                            color="primary"
                            className="px-0"
                            value={loading ? "Loading..." : "Confirm"}
                            onClick={handleForgotPassword}
                            disabled={loading}
                          >
                            Confirm
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

export default Password;
