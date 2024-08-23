import styles from "../../styles/stories/storyDetails.module.css";
import CommentsSection from "../comments/CommentsSection";
import Favorite from "../smallPieces/Favorite";
import Like from "../smallPieces/Like";

export default function StoryDetails({story,isFavorite,isLiked}) {
  const token = localStorage.getItem('token');


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
            <p>author: {story.author.username}</p>
          </div>
        </div>
        <div className={styles.actionsContainer}>
          <Favorite story={story} isFavorite={isFavorite}/>
          <Like story={story} isLiked={isLiked}/>
        </div>
      <CommentsSection story={story}/>
      </div>
  )
}
