import { useContext, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styles from "../styles/loginSignup/registerStyle.module.css";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";


const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user{
            _id
        }
    }
  }
`;


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createUser, { data, loading, error }] = useMutation(REGISTER_USER);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let registerSuccess = (await createUser({ variables: { username, email, password } })).data;
            let newToken = registerSuccess.createUser.token;
            let userId = registerSuccess.createUser.user._id;
            console.log('tioken', newToken);
            console.log('userId', userId);

            login(newToken,userId);
            alert("Registration successful!");
            navigate("/profile");
            // Optionally, redirect to login page or another route
        } catch (err) {
            console.error(err);
            alert("Registration failed!");
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputsContainer}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputsContainer}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputsContainer}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {error && <p className={styles.errorText}>Error: {error.message}</p>}
            </form>
            {data && <p className={styles.successText}>Registration successful!</p>}
        </div>
    )
}
