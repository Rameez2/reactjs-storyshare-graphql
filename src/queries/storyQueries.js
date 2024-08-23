// // src/queries/queries.js
// import { gql } from '@apollo/client';

// export const GET_STORIES = gql`
//   query GetStories {
//     stories {
//       _id
//       title
//       content
//       moral
//       author {
//         username
//       }
//     }
//   }
// `;

// export const GET_STORY_BY_ID =  gql`
// query GetStory($id: ID!) {
//   story(_id: $id) {
//     _id
//     title
//     content
//     moral
//     author {
//       _id
//       username
//     }
//     comments {
//       _id
//       content
//       rating
//       author {
//         _id
//         username
//       }
//     }
//   }
// }`;

// Add more queries as needed
