import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext";
import styles from "../../styles/comment/commentCard.module.css"
import { useMutation, gql } from '@apollo/client';
import DeleteLoader from "../smallPieces/loaders/DeleteLoader";
import { timeAgo } from "../../utils/timeAgo";

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(_id: $id) {
      _id
    }
  }
`;

export default function CommentCard({ handleRemoveComment, comment }) {

  const { user } = useContext(AuthContext);

  const [deleteComment,{loading}] = useMutation(DELETE_COMMENT, {
    context: {
      headers: {
        Authorization: user?.token ? `Bearer ${user?.token}` : '',
      },
    },
    variables: { id: comment._id },
    onCompleted: () => {
      handleRemoveComment(comment._id);
    },
    onError: (error) => {
      console.error('Error deleting comment:', error.message);
    },
  });

  const handleDelete = () => {
    deleteComment();
  };


  return (
    <div className={styles.commentCard}>
      {comment.author._id === user?.userId ?
        <>
          <div className={styles.infoContainer}>
            <div className={styles.userImage}>
              <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </div>
            <div className={styles.userInfoContainer}>
              <h3>{comment.author.username}</h3>
              <p>{timeAgo(comment?.createdAt)}</p>
            </div>
            {/* <div><i class="fa-regular fa-heart"></i></div> */}
            <div>
              <button onClick={handleDelete} className={styles.deleteComment}>{loading ? <DeleteLoader/>:<i className="fa-solid fa-trash"></i>}</button>
            </div>
          </div>


          {comment.content.length > 400 ? (
          <details>
            <summary>
                  <p className={styles.comment}>{comment.content.slice(0, 400)}</p>
            </summary>
            <p className={styles.comment}>{comment.content}</p>
          </details>
          ): (
            <p className={styles.comment}>{comment.content}</p>
          )}
        </>
        :
        <>
          <div className={styles.infoContainer}>
            <div className={styles.userImage}>
              <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            <div className={styles.userInfoContainer}>
              <h3>{comment.author.username}</h3>
              <p>1 day ago</p>
            </div>
            {/* <div><i class="fa-regular fa-heart"></i></div> */}
          </div>
          <div>
            <p className={styles.comment}>{comment.content}</p>
          </div>
        </>
      }
    </div>
  )
}
