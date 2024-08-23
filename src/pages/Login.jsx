import { useState, useContext } from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from "../contexts/authContext";
import styles from "../styles/loginSignup/login.module.css";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const { login: setAuth, user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      //   console.log('login',data);
      localStorage.setItem('token', data.login.token);
      setAuth(data.login.token, data.login.user._id);
      navigate('/'); // Redirect to home or another route after login
    } catch (e) {
      console.error(e.message);
    }
  };


  return (
    <>
      {user ? <Navigate to="/" /> :
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
        </div>
      }
    </>
  );
}
