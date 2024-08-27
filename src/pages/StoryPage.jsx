import StoryDetails from '../components/stories/StoryDetails'
import { useQuery,gql } from "@apollo/client";
import { useParams } from 'react-router-dom';
import StoriesList from '../components/stories/StoriesList';
import { useEffect } from 'react';
import Loader1 from '../components/smallPieces/loaders/Loader1';


const GET_STORY_DETAILS = gql`
  query GetStory($id: ID!) {
    story(_id: $id) {
      _id
      title
      content
      moral
      likes
      author {
        _id
        username
        followers {
          _id
          username
        }
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
      likes
      author {
        _id
        username
        followers {
          _id
          username
        }
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
  const userId = localStorage.getItem("userId");

  const { loading, error,refetch, data } = useQuery(
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

 // Refetch data on component load
 useEffect(() => {
  refetch();
}, [refetch]); // Depend on refetch so it's only called when the function itself changes

  if (loading) return <Loader1/>;
  if (error) return <p>Error: {error.message}</p>;

  const { story } = data;
  console.log(story);
  
    // Check if the story is in the user's favorites
    const favoriteStoryIds = token
    ? new Set(data.favoriteStories.map(story => story._id))
    : new Set(); // Empty set if not logged in
    // Check if the story is in the user's likes
    const likedStoryIds = token
    ? new Set(data.likedStories.map(story => story._id))
    : new Set(); // Empty set if not logged in

    const followersIds = token
    ? new Set(story.author.followers.map(follower => follower._id))
    : new Set(); // Empty set if not logged in


  return (
    <div>
        <StoryDetails story={story} isFavorite={favoriteStoryIds.has(story._id)} isLiked={likedStoryIds.has(story._id)} isFollowed={followersIds.has(userId)} />
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
