import {useState} from 'react'

// return the user data from the session storage
// export const getUser = () => {
//     const userStr = sessionStorage.getItem('user');
//     if (userStr) return JSON.parse(userStr);
//     else return null;
//   }
   
// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}

// refresh the token
export const refreshToken = () => {
  return sessionStorage.getItem('token') || null;
}
  
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}
  
// set the token and user from the session storage
export const setUserSession = (token, refresh) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('refresh', refresh);
}

export const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}