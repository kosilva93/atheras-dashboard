import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from "../../../assets/images/atheras-logo.png"; // Tell webpack this JS file uses this image
import { useFormInput } from "../../../api/utils";
import apiAuth from "src/api/authentication";

const Register = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const first_name = useFormInput("");
  const last_name = useFormInput("");
  const email = useFormInput("");
  const password1 = useFormInput("");
  const password2 = useFormInput("");
  const cmp_name = useFormInput("");

  const handleRegister = () => {
    setError(null);
    setLoading(true);

    let body = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password1.value,
      cmp_name: cmp_name.value,
      cmp_country_name: "",
      cmp_address: "",
    };

    // API call to register the user
    if (password1.value !== password2.value) {
      setLoading(false);
      setError("Passwords do not match");
    } else if (String(password1.value).length < 6) {
      setLoading(false);
      setError("Password needs to be at least 6 characters long");
    } else apiAuth.register(body)
      .then((response) => {
        setLoading(false);
        // If response is successful take the user to Login page
        props.history.push("/login");
        alert("User was successfully registered");
      })
      .catch((error) => {
        setError(error.data.message);
        setLoading(false);
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
            <CCol md="9" lg="7" xl="6">
              {/* <CCard className="mx-4"> */}
              <CCard className="mx-4" style={{ background: "#88a5ce" }}>
                <CCardBody className="p-4">
                  <CForm>
                    {/* <h1 style={{ color: '#29479e' }}>Register</h1> */}
                    <h1 className="text-white">Register</h1>
                    {/* <p className="text-muted">Create your account</p> */}
                    <p className="text-white">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        {...first_name}
                        placeholder="First Name"
                        autoComplete="firstname"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        {...last_name}
                        placeholder="Last Name"
                        autoComplete="lastname"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        {...email}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-building" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        {...cmp_name}
                        placeholder="Company"
                        autoComplete="company"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        {...password1}
                        placeholder="Password"
                        autoComplete="password"
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
                        placeholder="Confirm password"
                        autoComplete="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        {/* <CButton block color="primary" className="px-0" onClick={() => history.push(`/login`)}>Register</CButton> */}
                        <CButton
                          block
                          color="primary"
                          className="px-0"
                          value={loading ? "Loading..." : "Register"}
                          onClick={handleRegister}
                          disabled={loading}
                        >
                          Register
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
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

// const useFormInput = initialValue => {
//   const [value, setValue] = useState(initialValue);

//   const handleChange = e => {
//     setValue(e.target.value);
//   }
//   return {
//     value,
//     onChange: handleChange
//   }
// }

export default Register;
