import { useQuery, gql } from "@apollo/client"
import { useState } from "react";
import StoriesCard from "./StoriesCard";
import styles from "../../styles/stories/followedAuthorsStory.module.css";

const GET_FOLLOWED_AUTHORS_STORIES = gql`
  query GetFollowedAuthorsStories {
    currentuser {
      _id
      username
      followings {
        _id
        username 
        stories {
            title
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

export default function FollowedAuthorsStory() {
    const [stories, setStories] = useState([]);
    const [likedStories,setLikedStories] = useState([]);
    const [favoriteStories,setFavoriteStories] = useState([]);
    const token = localStorage.getItem("token");

    const { loading, error } = useQuery(GET_FOLLOWED_AUTHORS_STORIES, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        onCompleted: (data) => {
            // Handle the data when the query completes
            const allStories = data.currentuser.followings.map(author => author.stories).flat();
            setStories(allStories);
            setFavoriteStories(data.favoriteStories)
            setLikedStories(data.likedStories)
        },
        onError: (error) => {
            console.error('Error fetching stories:', error);
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const favoriteStoryIds = token
        ? new Set(favoriteStories.map(story => story._id))
        : new Set(); // Empty set if not logged in

    const likedStoryIds = token
        ? new Set(likedStories.map(story => story._id))
        : new Set(); // Empty set if not logged in


    console.log('yes', stories);

    return (
        <div>
            <h1>Followed Authors Stories</h1>
            <div className={styles.container}>
                {stories?.length ?
                    stories.map((story) => (
                        <StoriesCard key={story._id} story={story} isFavorite={favoriteStoryIds.has(story._id)} isLiked={likedStoryIds.has(story._id)} />
                    ))
                    :
                    <>No Stories </>
                }
            </div>
        </div>
    );
}
