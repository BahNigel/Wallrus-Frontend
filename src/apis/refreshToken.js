import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../apis/AuthContext';

const RefreshToken = async (refreshToken) => {

  const { setIsAuth } = useContext(AuthContext);

  const requestOptions = { client_id: `${process.env.REACT_APP_login_client_id}`, client_secret: `${process.env.REACT_APP_login_client_secret}`, grant_type: 'refresh_token', refresh_token: `${refreshToken}` };
  let token;
  await axios.post(`${process.env.REACT_APP_ROOT_URL}/auth/token`, requestOptions)
    .then(response => response)
    .then((data) => {
      token = data;
    })
    .catch((err) => {
      alert('REFREEESSHH Error in fetching data, please log in again.');
      window.localStorage.clear();
      window.sessionStorage.clear();
      setIsAuth(false);
      history.push('/');
    })
  return token;
}

export default RefreshToken;