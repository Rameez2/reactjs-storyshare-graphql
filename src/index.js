import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { AuthProvider } from './contexts/authContext';


const client = new ApolloClient({
  uri:'https://vercel-node-story-graphql-yyx6.vercel.app/', // Replace with your GraphQL server URL
  cache: new InMemoryCache()
});


console.log('ashjfbhalsflas',process.env.REACT_APP_API_UR);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
