import styles from "../../styles/stories/storyDetails.module.css";
import CommentsSection from "../comments/CommentsSection";
import Favorite from "../smallPieces/Favorite";
import Follow from "../smallPieces/Follow";
import Like from "../smallPieces/Like";
import { Link } from "react-router-dom";



export default function StoryDetails({story,isFavorite,isLiked,isFollowed}) {
  // const token = localStorage.getItem('token');
  console.log('followers',story.author,isFollowed);
  console.log('followed',isFollowed);
  
  return (
      <div className={styles.storyDetailsContainer}>
        <div className={styles.storyContainer}>
          <h1 className={styles.storyTitle}>{story.title}</h1>
          <div className={styles.contentContainer}>
            <pre className={styles.story}>{story.content}</pre>
          </div>
          <div className={styles.moralContainer}>
            <p>Moral : <span>{story.moral}</span></p>
          </div>
          <div className={styles.authorContainer}>
            <p>author: <Link to={`/profile/${story.author._id}`}>{story.author.username}</Link></p>
          </div>
        </div>
        <div className={styles.actionsContainer}>
          <Favorite story={story} isFavorite={isFavorite}/>
          <Like story={story} isLiked={isLiked}/>
          <Follow authorId={story.author._id} isFollowed={isFollowed}/>
        </div>
      <CommentsSection story={story}/>
      </div>
  )
}
