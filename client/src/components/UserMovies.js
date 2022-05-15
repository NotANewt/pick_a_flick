import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Stack, Form, Badge, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";

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
      window.location.replace("/LoginSignup");
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
      <h2>{userData.movies.length ? `Saved movies:` : "You have no saved movies"}</h2>
      <Row>
        {userData.movies?.map((movie) => {
          return (
            <Col lg={3} key={movie.title}>
              <Card border="dark" style={{ marginBottom: "2rem" }}>
                <Card.Img variant="top" src={movie.posterImage} alt={`The movie poster ${movie.title}`} />
                <Card.Body className="d-grid gap-2">
                  <Button style={{ marginBottom: "1rem", marginTop: "1rem" }} href={`../Movies/MovieDetails/${movie.dddId}`}>
                    View Movie Details
                  </Button>
                  <Button className="btn-danger" onClick={() => handleDeleteUserMovie(movie)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default UserMovieList;
