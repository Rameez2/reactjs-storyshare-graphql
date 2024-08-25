import { useQuery, gql } from '@apollo/client';
import styles from "../styles/profile/myStories.module.css"
import StoryDelete from '../components/stories/StoryDelete';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const GET_MY_STORIES = gql`
  query GetMyStories {
    mystories {
      _id
      title
      content
      moral
    }
  }
`;


export default function MyStories() {
  const token = localStorage.getItem('token');
  const [stories, setStories] = useState([]);

  // Fetch the user's stories
  const { loading, error, refetch } = useQuery(GET_MY_STORIES, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    onCompleted: (data) => {
      setStories(data.mystories);
    }
  });
 // Refetch data on component load
 useEffect(() => {
  refetch();
}, [refetch]); // Depend on refetch so it's only called when the function itself changes


  function handleDeleteStory(storyId) {
    // Update local state to remove the deleted story
    setStories(stories.filter(story => story._id !== storyId));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (

    <div className={styles.container}>
      <h1>My Stories</h1>
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
                  <StoryDelete storyId={story._id} handleDeleteStory={handleDeleteStory} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
