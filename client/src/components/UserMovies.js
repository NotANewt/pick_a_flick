import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Stack, Form, Badge, Image } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_USER_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";

const UserMovieList = (props) => {
  const [removeUserMovie, { error }] = useMutation(REMOVE_USER_MOVIE);

  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);
  const userData = dataMe?.me || {};

  if (loadingMe) {
    return <h2>LOADING SAVED MOVIES...</h2>;
  }

  //handle user clicking button to delete a movie
  const handleDeleteUserMovie = async (movie) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const movieData = { dddId: movie.dddId };

    try {
      const { data } = await removeUserMovie({
        variables: {
          movieData,
        },
      });
    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  return (
    <>
      <h2>{userData.movies.length ? `Viewing saved movies:` : "You have no saved movies"}</h2>
      <Row>
        {userData.movies?.map((movie) => {
          return (
            <Col lg={4} key={movie.title}>
              {movie.posterImage ? <Image src={movie.posterImage} alt={`The movie poster ${movie.title}`} fluid={true} /> : null}
              <Button className="btn-block btn-danger" onClick={() => handleDeleteUserMovie(movie)}>
                Delete
              </Button>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default UserMovieList;
