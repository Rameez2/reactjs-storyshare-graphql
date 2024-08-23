import { useQuery,gql } from "@apollo/client";
import { Link } from "react-router-dom";
import styles from "../styles/profile/myfavstories.module.css";
import { useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import Favorite from "../components/smallPieces/Favorite";

export const GET_FAVORITE_STORIES = gql`
  query favoriteStories {
    favoriteStories {
      _id
      title
      content
      moral
      author {
        _id
        username
        email
      }
    }
  }
`;

export default function MyFavStories() {
    const token = localStorage.getItem("token");
    const [stories, setStories] = useState([]);

    const { loading, error,refetch } = useQuery(GET_FAVORITE_STORIES,{
        context:{
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
              },
        },
        onCompleted:(data) => {
          setStories(data.favoriteStories);
        }
    });

    
    const favoriteStoryIds = token
    ? new Set(stories.map(story => story._id))
    : new Set(); // Empty set if not logged in

    function handleRemoveFromFavorite(storyId) {
      setStories(stories.filter(story => story._id !== storyId));
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  

    return (

      <div className={styles.container}>
      <h1>Favorite Stories</h1>
      {stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <div className={styles.myStoriesList}>

          <AnimatePresence>

            {stories.map(story => (

              <motion.div
              key={story._id}
              initial={false} // No initial animation
              exit={{
                opacity: 0,
                rotateX: [0, 90, 180], // Vertical flip effect
                transition: { duration: 1, ease: 'easeInOut' } // Smooth transition
              }}
              style={{
                transformStyle: 'preserve-3d', // Ensure 3D transform is preserved
                backfaceVisibility: 'hidden' // Hide the back face during the flip
              }}
                >
                <div key={story._id} className={styles.story}>
                  <div className={styles.titleContainer}>
                    <h2><Link to={`/stories/${story._id}`}>{story.title}</Link></h2>

                  </div>
                  <div className={styles.storyContent}>
                    {story?.content?.length > 700 ? <p>{story.content?.slice(0, 700)}... <span className={styles.fullStory}> <Link to={`/stories/${story._id}`}>(view full story)</Link></span></p> : <p>{story.content}</p>}
                    <p><span className={styles.moral}>Moral:</span> {story.moral}</p>
                  </div>
                  <div onClick={() => handleRemoveFromFavorite(story._id)} className={styles.favoriteContainer}>
                    <Favorite story={story} isFavorite={favoriteStoryIds.has(story._id)} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
    );
}
