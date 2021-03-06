import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import components
import Layout from "./components/Layout";

// import pages
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import MovieSearch from "./pages/MovieSearch";
import DealbreakersSearch from "./pages/DealbreakersSearch";
import MovieDetails from "./pages/MovieDetails";
import GroupPage from "./pages/GroupPage";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them\
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginSignup" element={<LoginSignup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dealbreakers" element={<DealbreakersSearch />} />
            <Route path="/Movies" element={<MovieSearch />} />
            <Route path="/Movies/MovieDetails/:dddId" element={<MovieDetails />} />
            <Route path="/GroupPage/:_id" element={<GroupPage />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
