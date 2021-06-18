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

const ResetPassword = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const password1 = useFormInput("");
  const password2 = useFormInput("");

  const handleResetPassword = () => {
    setError(null);
    setLoading(true);

    if (password1.value !== password2.value) {
      setLoading(false);
      setError("Passwords do not match");
    } else if (String(password1.value).length < 6) {
      setLoading(false);
      setError("Password needs to be at least 6 characters long");
    } else if (!props.match.params) {
      setLoading(false);
      setError("Missing uid and/or token from emailed link");
    } else {
      apiAuth
        .resetPassword({
          uid64: props.match.params.uid,
          token: props.match.params.token,
          password: password1.value,
        })
        .then((response) => {
          // API call to authenticate the user
          setLoading(false);
          // If successful, take the user to Login page
          alert(response.data.message);
          props.history.push("/login");
        })
        .catch((error) => {
          setLoading(false);
          setError(error.data.message);
        });
    }
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
                {/* <CCard className="p-4"> */}
                <CCard className="p-4" style={{ background: "#88a5ce" }}>
                  <CCardBody>
                    <CForm>
                      <h1 className="text-white">Reset Password</h1>
                      {/* <h1 style={{ color: '#29479e' }}>Reset Password</h1> */}
                      <p className="text-white">
                        Please submit your new password:
                      </p>
                      {/* <p className="text-muted">Please submit your new password:</p> */}
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          {...password1}
                          placeholder="New Password"
                          autoComplete="new-password"
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
                          {...password2}
                          placeholder="Confirm Password"
                          autoComplete="confirm-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6" className="text-right">
                          <CButton
                            block
                            color="primary"
                            className="px-0"
                            value={loading ? "Loading..." : "Confirm"}
                            onClick={handleResetPassword}
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

export default ResetPassword;
