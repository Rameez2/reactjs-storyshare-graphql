import { Link } from "react-router-dom";
import ChangePassword from "../components/profile/ChangePassword";
import UserDetails from "../components/profile/UserDetails";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import styles from "../styles/profile/profile.module.css";


export default function Profile() {
  const {user} = useContext(AuthContext);

  return (
    <>
      {user ? 
        <div className={styles.container}>
            <h1>Profile</h1>
          <UserDetails/>
            <ChangePassword/>
            <div className={styles.moreContainer}>
              <h1>MORE</h1>
              <div className={styles.links}>
              <Link to="/create-story">Create Story</Link>
              <Link to="/profile/my-stories">My Stories</Link>
              <Link to="/profile/my-favorites-stories">Favorites Stories</Link>
              </div>
            </div>
        </div> :
        <h1>Please <Link to="/login">Login</Link></h1>
      }
    </>
  )
}
