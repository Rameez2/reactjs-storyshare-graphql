import {useMutation, gql } from '@apollo/client';
import styles from "../../styles/stories/storyDelete.module.css";

// GraphQL Mutation for deleting a story
const DELETE_STORY = gql`
  mutation DeleteStory($id: ID!) {
    deleteStory(_id: $id) {
      _id
      title
    }
  }
`;

export default function StoryDelete({storyId,handleDeleteStory}) {


    // Use the mutation
    const [deleteStory, { loading, error }] = useMutation(DELETE_STORY, {
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
        onCompleted: () => {
          // Redirect after deletion
          console.log('Story Deleted Success!');
        },
      });


  // Handle story deletion
  const handleDelete = async () => {
    try {
        if (window.confirm("Are you sure you want to delete this story?")) {
            await deleteStory({ variables: { id: storyId } });
            handleDeleteStory(storyId);
          }
    } catch (e) {
      console.error('Error deleting story:', e.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
        <button className={styles.deleteBtn} onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
    </>
  )
}
