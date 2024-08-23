import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/smallPieces/like.module.css"

const LIKE_STORY = gql`
  mutation LikeStory($_id: ID!) {
    likeStory(_id: $_id) {
      _id
    }
  }
`;

const UNLIKE_STORY = gql`
  mutation UnlikeStory($_id: ID!) {
    unlikeStory(_id: $_id) {
      _id
    }
  }
`;

export default function Like({isLiked,story}) {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [liked, setLiked] = useState(isLiked || false);
      const [likeStory] = useMutation(LIKE_STORY);
  const [unlikeStory] = useMutation(UNLIKE_STORY);

    const handleLike = async () => {
        try {
          if(!token) {
            navigate("/login");
          }
          await likeStory({
             variables: { _id: story._id },
            context: {
              headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
            }
           });
          setLiked(true);
        } catch (error) {
          console.log(error);
          
        }
      };
      
      const handleUnlike = async () => {
        try {
          if(!token) {
            navigate("/login");
          }
          await unlikeStory({ 
            variables: { _id: story._id },
            context: {
              headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
            }
           });
        } catch (error) {
            console.log(error);
            
        }
      
        setLiked(false);
      };

  return (
    <>
      {liked ? <i onClick={handleUnlike} className={`fa-solid fa-thumbs-up ${styles.like}`}></i> : <i onClick={handleLike} className={`fa-regular fa-thumbs-up ${styles.like}`}></i>}
    </>
  )
}
