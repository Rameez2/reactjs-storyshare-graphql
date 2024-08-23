import CommentCard from "./CommentCard";
import styles from "../../styles/comment/commentsSection.module.css";
import CommentCreate from "./CommentCreate";
import { useState,useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';


export default function CommentsSection({story}) {
    const [comments,setComments] = useState(story.comments || []);

  // Function to add a new comment
  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments,newComment]);
  };
// Function to remove a comment
    const handleRemoveComment = (commentId) => {
        let newCOmmentrs = comments.filter((e) => e._id !== commentId);
        setComments(newCOmmentrs);
    };

  // Reinitialize comments state when the story prop changes
  useEffect(() => {
    setComments(story.comments || []);
  }, [story]);

  return (
    <div>
    <CommentCreate handleNewComment={handleNewComment} storyId={story._id}/>
      <div className={styles.commentsContainer}>

      <AnimatePresence>
        {comments.map((comment) => (

<motion.div
           key={comment._id}
           initial={false} // No initial animation
           exit={{
             opacity: 0,
             x: [0, -5, 5, -5, 5, -5, 0], // Vibration effect
             transition: { duration: 0.5, ease: 'easeInOut' }, // Smooth fade out and vibration
           }}
>
            <CommentCard handleRemoveComment={handleRemoveComment} key={comment._id} comment={comment}/>

            </motion.div>
        ))}


</AnimatePresence>
      </div>
    </div>
  )
}
