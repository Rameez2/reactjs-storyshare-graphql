import { Link, useParams } from "react-router-dom";
import ChangePassword from "../components/profile/ChangePassword";
import UserDetails from "../components/profile/UserDetails";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import styles from "../styles/profile/profile.module.css";
import { gql, useQuery } from '@apollo/client';
import Loader1 from "../components/smallPieces/loaders/Loader1";

const GET_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      stories {
        _id
        title
      }
      followers {
        _id
        username
      }
      followings {
        _id
        username 
      }
    }
  }
`;

const GET_CURRENT_USER = gql`
  query getUser {
    currentuser {
      _id
      email
      username
      stories {
        _id
        title
      }
      followers {
        _id
        username
      }
      followings {
        _id
        username 
      }
    }
  }
`;

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState({});

  const isCurrentUser = user && user.userId === id;

  const { loading, error,refetch } = useQuery(
    isCurrentUser ? GET_CURRENT_USER : GET_USER,
    {
      variables: isCurrentUser ? {} : { _id: id },
      context: {
        headers: {
          Authorization: isCurrentUser ? `Bearer ${localStorage.getItem('token')}` : '',
        },
      },
      onCompleted: (data) => {
        setProfileUser(isCurrentUser ? data.currentuser : data.user);
      },
    }
  );

  // Refetch data on component load
  useEffect(() => {
    refetch();
  }, [refetch]); // Depend on refetch so it's only called when the function itself changes

  if (loading) return <Loader1/>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <UserDetails user={profileUser} />
      {isCurrentUser && <ChangePassword />}
      <div className={styles.moreContainer}>
          {isCurrentUser && <h1>MORE</h1>}
        <div className={styles.links}>
          {isCurrentUser && 
        (
            <>
              <Link to="/create-story">Create Story</Link>
              <Link to="/profile/my-stories">My Stories</Link>
              <Link to="/profile/my-favorites-stories">Favorites Stories</Link>
            </>
        )
          }
        </div>
      </div>
    </div>

  );
}