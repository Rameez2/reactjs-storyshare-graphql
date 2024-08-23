import styles from "../../styles/stories/storiesCard.module.css";
import { useNavigate } from "react-router-dom";
import Favorite from "../smallPieces/Favorite";
import Like from "../smallPieces/Like";


export default function StoriesCard({story,isFavorite,isLiked}) {
  const navigate = useNavigate();
  function goToStory() {
    navigate(`/stories/${story._id}`);
  }


  return (

    <div key={story._id} className={styles.storyCard}>
    <div className={styles.imageContainer}>
        <img src="https://img.freepik.com/fotos-premium/hintergrund-mystische-waldillustration-landschaft-im-cartoon-stil-endloser-naturhintergrund_784625-80.jpg" alt="" />
    </div>
    <div className={styles.title}>
        <h1>{story?.title}</h1>
    </div>
    {/* <div className={styles.content}>
        <p>{story?.content.slice(0,100)}...</p>
        <h3>{story?.moral.slice(0,40)}...</h3>
    </div> */}
    {/* <div>
        <p>Author : <span>{story?.author.username}</span></p>
    </div> */}
  <div className={styles.heartIconContainer}>
    <Favorite story={story} isFavorite={isFavorite}/>
  </div>
  <div className={styles.likeIconContainer}>
    <Like story={story} isLiked={isLiked}/>
  </div>

    <div className={styles.readmore}>
      <button onClick={goToStory} className={`btn ${styles.readMoreBtn}`}>
      <i className="fa-solid fa-arrow-right"></i>
      <span className={styles.buttonText}>Read More</span>
      </button>
    </div>
</div>
  )
}
