import { useState,useEffect } from "react";
import { ApolloClient, InMemoryCache, HttpLink, useQuery, gql } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import styles from "../../styles/profile/userDetails.module.css";

const GET_USER_DATA = gql`
  query GetUserData {
    currentuser {
      _id
      username
      email
    }
  }
`;

export default function UserDetails({user}) {

    const [client, setClient] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Create an auth link
        const authLink = setContext((_, { headers }) => ({
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            }
        }));

        // Create an http link
        const httpLink = new HttpLink({
            uri: 'https://vercel-node-story-graphql-yyx6.vercel.app/', // Your GraphQL server URL
        });

        // Create Apollo client
        const apolloClient = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });

        setClient(apolloClient);
    }, []);

    const { loading, error, data } = useQuery(GET_USER_DATA, { client });

  return (
    <>
    {loading ? <h1>Loading...</h1> : error ? <h1>Error : {error.message}</h1> :
      <table className={styles.userTable}>
      <tbody>
        <tr>
          <td className={styles.staticCell}>Username:</td>
          <td>{data?.currentuser?.username}</td>
        </tr>
        <tr>
          <td className={styles.staticCell}>Email:</td>
          <td>{data?.currentuser?.email}</td>
        </tr>
      </tbody>
      <button>Edit</button>
      </table>
    }
    </>
  )
}
