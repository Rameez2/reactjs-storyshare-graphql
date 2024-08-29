import { useQuery, gql } from "@apollo/client";
import styles from "../../styles/stories/storiesListStyle.module.css";
import StoriesCard from "./StoriesCard";
import { useRef, useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader1 from "../smallPieces/loaders/Loader1";


const GET_STORIES = gql`
  query GetStories($limit: Int, $offset: Int) {
    stories(limit: $limit, offset: $offset) {
      _id
      title
      content
      moral
      author {
        username
      }
    }
  }
`;

const GET_STORIES_WITH_FAVORITES = gql`
  query GetStoriesWithFavorites($limit: Int, $offset: Int) {
    stories(limit: $limit, offset: $offset) {
      _id
      title
      content
      moral
      author {
        username
      }
    }
    favoriteStories {
      _id
    }
    likedStories {
      _id
    }
  }
`;

export default function StoriesList() {
  const token = localStorage.getItem("token");
  const [limit] = useState(5); // number of stories per page
  // const [offset, setOffset] = useState(0); // offset based on current page
  const [showStories, setShowStories] = useState([]);


  const { loading, error, refetch,data } = useQuery(
    token ? GET_STORIES_WITH_FAVORITES : GET_STORIES,
    {
      // variables: {
      //   limit,
      //   offset: (offset * limit)
      // },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
      onCompleted: (data) => {
        // setShowStories(data.stories);
        // Adding more stories to storiesList 
        // setShowStories((prevStories) => [...prevStories, ...data.stories]);
        setShowStories(data.stories);
      }
    }
  );

 // Refetch data on component load
 useEffect(() => {
  refetch();
}, [refetch]); // Depend on refetch so it's only called when the function itself changes

// ******
const scrollContainerRef = useRef(null);
//****** */

  if (loading) return <Loader1/>;
  if (error) return <p>Error: {error.message}</p>;

  const stories = data.stories || [];

  // Disable "Next" if less than 5 items fetched (end of available items)
  const isNextDisabled = stories.length < limit;

  // console.log('stories',data.favoriteStories);
  const favoriteStoryIds = token
    ? new Set(data.favoriteStories.map(story => story._id))
    : new Set(); // Empty set if not logged in

  const likedStoryIds = token
    ? new Set(data.likedStories.map(story => story._id))
    : new Set(); // Empty set if not logged in



  // ***************

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust based on your item size
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust based on your item size
        behavior: 'smooth'
      });
    }
  };

  console.log('stories',showStories);
  

  return (
    <>

      <div className={styles.paginationBtnDiv}>
        <button className={styles.paginationBtn} onClick={scrollLeft} > <i className="fa-solid fa-arrow-left"></i> </button>
        {/* <span>{offset}</span> */}
        <button className={styles.paginationBtn} onClick={scrollRight} disabled={isNextDisabled}><i className="fa-solid fa-arrow-right"></i></button>
      </div>
      <AnimatePresence>
        <motion.div
          // key={offset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5
          }}
        >
          <div className={styles.storiesListComp} ref={scrollContainerRef}>
            {showStories.map((story) => (
              <StoriesCard key={story._id} story={story} isFavorite={favoriteStoryIds.has(story._id)} isLiked={likedStoryIds.has(story._id)} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
