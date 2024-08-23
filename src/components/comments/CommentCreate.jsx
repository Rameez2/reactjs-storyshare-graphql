import { useMutation,gql } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import styles from "../../styles/comment/commentCreate.module.css";

const CREATE_COMMENT = gql`
  mutation CreateComment($storyId: ID!, $content: String!) {
    createComment(storyId: $storyId, content: $content) {
      _id
      content
      author {
        _id
        username
      }
    }
  }
`;

export default function CommentCreate({handleNewComment,storyId}) {
    const [content, setContent] = useState('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      },
      onCompleted: (data) => {
          console.log('new',data.createComment);
            handleNewComment(data.createComment);
            setContent('');
      },
    });


          // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(!user) navigate("/login");
        await createComment({ variables: { storyId:storyId, content } });
    } catch (e) {
      console.error('Error creating comment:', e.message);
    }
  };


  return (
    <div>
      <h1 className={styles.commentsHeading}>Comments</h1>
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <div>
          <textarea
            placeholder="Comment content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className={styles.createCommentBtn} type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  )
}
