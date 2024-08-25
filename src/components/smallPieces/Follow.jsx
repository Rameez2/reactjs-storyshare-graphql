import { useMutation,gql } from "@apollo/client";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/smallPieces/follow.module.css"

const ADD_FOLLOWER_MUTATION = gql`
  mutation AddFollower($followerId: ID!) {
    addFollower(followerId: $followerId) {
      _id
      username
    }
  }
`;

const UNFOLLOW_USER_MUTATION  = gql`
  mutation RemoveFollower($followerId: ID!) {
    removeFollower(followerId: $followerId) {
      _id
      username
    }
  }
`;


export default function Follow({authorId,isFollowed}) {
    const [follow, setFollow] = useState(isFollowed || false);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [addFollower, { loading }] = useMutation(ADD_FOLLOWER_MUTATION, {
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        },
      });

      const [removeFollower] = useMutation(UNFOLLOW_USER_MUTATION, {
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        },
      });

    async function handleFollow() {
      try {
          if(!user) {
              navigate("/login");
              return;
            }
        console.log('following',authorId);
        await addFollower({ variables: { followerId:authorId } });
        setFollow(true);
        alert('User followed successfully!');
      } catch (err) {
        console.error('Error following user:', err);
      }
    };

    async function handleUnFollow() {
        try {
            if(!user) {
                navigate("/login");
                return;
              }
            console.log('Unfollowing', authorId);
            await removeFollower({ variables: { followerId: authorId } });
            setFollow(false);
            alert('User unfollowed successfully!');
          } catch (err) {
            console.error('Error unfollowing user:', err);
          }
    }
    console.log('fff',follow);
    
  return (
    <>
    {follow ? 
    <button className={styles.followedBtn} onClick={handleUnFollow} disabled={loading}>
        {loading ? 'UnFollowing...' : 'Followed'}
      </button> :
    <button className={styles.followBtn} onClick={handleFollow} disabled={loading}>
      {loading ? 'Following...' : 'Follow'}
    </button> 
    }
    </>
  )
}
