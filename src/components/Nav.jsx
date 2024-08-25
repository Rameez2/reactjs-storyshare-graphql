import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const { user,logout } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <h1><Link to="/">Home</Link></h1>
      <h1><Link to="/create-story">Create Story</Link></h1>
      {user ? 
        <>
          <h1><Link to={`/profile/${user.userId}`}>Profile</Link></h1>
          <h1><Link to="/profile/my-favorites-stories">Favorties</Link></h1>
          <h1><button onClick={logout} className={styles.logoutBtn}>Log Out</button></h1>
        </>
        :
          <>
            <h1><Link to="/register">register</Link></h1>
            <h1><Link to="/login">login</Link></h1>
          </>
        }

    </nav>
  )
}
