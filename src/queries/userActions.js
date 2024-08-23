import { useMutation, gql } from '@apollo/client';


const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($storyId: ID!) {
    addStoryToFavorites(_id: $storyId) {
      _id
      title
      content
      moral
    }
  }
`;

const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($storyId: ID!) {
    removeStoryFromFavorites(_id: $storyId) {
      _id
    }
  }
`;

const LIKE_STORY = gql`
  mutation LikeStory($_id: ID!) {
    likeStory(_id: $_id) {
      _id
    }
  }
`;

const UNLIKE_STORY = gql`
  mutation UnlikeStory($_id: ID!) {
    unlikeStory(_id: $_id) {
      _id
    }
  }
`;

