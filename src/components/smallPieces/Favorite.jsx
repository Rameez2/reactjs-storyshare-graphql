import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from "../../styles/smallPieces/favorite.module.css";


const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($storyId: ID!) {
    addStoryToFavorites(_id: $storyId) {
      _id
      title
      content
      moral
    }
  }
`;

const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($storyId: ID!) {
    removeStoryFromFavorites(_id: $storyId) {
      _id
    }
  }
`;

export default function Favorite({isFavorite,story}) {
    const navigate = useNavigate();  
    const token = localStorage.getItem("token");
    const [favorite,setFavorite] = useState(isFavorite || false);
    const [addStoryToFavorites] = useMutation(ADD_TO_FAVORITES);
    const [removeStoryFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);

    const handleAddToFavorites = async () => {
        try {
          if(!token) {
            navigate("/login");
          }
          setFavorite(true);
          await addStoryToFavorites({
            variables: { storyId:story._id },
            context: {
              headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
            },
          });
          // Optionally redirect or show a success message
        } catch (error) {
          console.error('Error adding story to favorites:', error);
        }
      };
    
      const handleRemoveFromFavorites = async () => {
        try {
          if(!token) {
            navigate("/login");
          }
          setFavorite(false);
          await removeStoryFromFavorites({
            variables: { storyId:story._id },
            context: {
              headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
            },
          });
          // Optionally redirect or show a success message
        } catch (error) {
          console.error('Error removing story from favorites:', error);
        }
      };

  return (
    <>
      {favorite ? <i className={`fa-solid fa-bookmark ${styles.fav}`} onClick={handleRemoveFromFavorites}></i>:<i className={`fa-regular fa-bookmark ${styles.fav}`} onClick={handleAddToFavorites}></i>}
    </>
  )
}
