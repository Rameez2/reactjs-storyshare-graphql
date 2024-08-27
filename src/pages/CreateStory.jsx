import { useContext, useState } from "react"
import { AuthContext } from "../contexts/authContext"
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/stories/createStory.module.css";
import Loader1 from "../components/smallPieces/loaders/Loader1";


const CREATE_STORY = gql`
  mutation CreateStory($title: String!, $content: String!, $moral: String!) {
    createStory(title: $title, content: $content, moral: $moral) {
      _id
      title
      content
      moral
    }
  }
`;

export default function CreateStory() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moral, setMoral] = useState('');
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Define the mutation with context to include the authorization header
  const [createStory, { loading, error }] = useMutation(CREATE_STORY, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const { user } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storyCreated = await createStory({ variables: { title, content, moral } });
      console.log(storyCreated.data.createStory._id);
      // Optionally, redirect or clear the form after successful creation
      navigate(`/stories/${storyCreated.data.createStory._id}`)
    } catch (err) {
      console.error('Error creating story:', err);
    }
  };

  return (
    <>
      {user ?
        <div className={styles.container}>
          <h1>Create Story</h1>
          <form onSubmit={handleSubmit}>
            <input className={styles.title}
              type="text"
              placeholder="Story Title"
              value={title}
              required={true}
              onChange={(e) => setTitle(e.target.value)} />

            <textarea className={styles.content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your story here..."
              rows="10"
              cols="50"
              value={content}
              required={true}
            />
            <input className={styles.moral}
              type="text"
              placeholder="Story Moral"
              value={moral}
              required={true}
              onChange={(e) => setMoral(e.target.value)}
            />
            {/* <button type="submit" disabled={loading}> */}
              {loading ? <Loader1/> : <button type="submit" disabled={loading}>Create Story</button>}
            
          </form>
          {error && <p>Error: {error.message}</p>}
        </div> :
        <h1>Please <Link to="/login">Login</Link></h1>
      }
    </>
  )
}
