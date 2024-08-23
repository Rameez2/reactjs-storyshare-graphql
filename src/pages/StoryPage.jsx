import StoryDetails from '../components/stories/StoryDetails'
import { useQuery,gql } from "@apollo/client";
import { useParams } from 'react-router-dom';
import StoriesList from '../components/stories/StoriesList';


const GET_STORY_DETAILS = gql`
  query GetStory($id: ID!) {
    story(_id: $id) {
      _id
      title
      content
      moral
      author {
        _id
        username
      }
      comments {
        _id
        content
        createdAt
        author {
          _id
          username
        }
      }
    }
  }
`;

const GET_STORY_DETAILS_WITH_FAVORITES = gql`
  query GetStoryWithFavorites($id: ID!) {
    story(_id: $id) {
      _id
      title
      content
      moral
      author {
        _id
        username
      }
      comments {
        _id
        content
        createdAt
        author {
          _id
          username
        }
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

export default function StoryPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { loading, error, data } = useQuery(
    token ? GET_STORY_DETAILS_WITH_FAVORITES : GET_STORY_DETAILS,
    {
      variables: { id: id },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { story, favoriteStories } = data;

    // Check if the story is in the user's favorites
    const favoriteStoryIds = token
    ? new Set(data.favoriteStories.map(story => story._id))
    : new Set(); // Empty set if not logged in
    // Check if the story is in the user's likes
    const likedStoryIds = token
    ? new Set(data.likedStories.map(story => story._id))
    : new Set(); // Empty set if not logged in

    

  return (
    <div>
        <StoryDetails story={story} isFavorite={favoriteStoryIds.has(story._id)} isLiked={likedStoryIds.has(story._id)} />
        {/* Suggest some more stories below */}
        <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            color: "#e5e5e5",
            textAlign: "center"
        }}>More Stories</h1>
        <StoriesList/>
    </div>
  )
}
