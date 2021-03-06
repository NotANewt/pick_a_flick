import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Stack, Form, Badge, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_USER_MOVIE, SAVE_USER_MOVIE_TO_GROUP } from "../utils/mutations";

import Auth from "../utils/auth";
import { GroupMovieList } from "../components/Groups";

// Show list of user's movies on Profile page
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
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title>{userData.movies.length ? `Saved movies:` : "You have no saved movies"}</Card.Title>
            <Row>
              {userData.movies?.map((movie) => {
                return (
                  <Col lg={2} key={movie.title}>
                    <Card border="dark" style={{ marginBottom: "2rem" }}>
                      <Card.Img variant="top" src={movie.posterImage} alt={`The movie poster ${movie.title}`} />
                      <Card.Body className="d-grid gap-2">
                        <div className="border-top mx-auto">
                          <Button variant="outline-primary" style={{ marginBottom: "1rem", marginTop: "1rem", marginRight: "1rem", fontSize: "12px" }} href={`../Movies/MovieDetails/${movie.dddId}`}>
                            Details
                          </Button>
                          <Button variant="outline-danger" style={{ marginBottom: "1rem", marginTop: "1rem", fontSize: "12px" }} onClick={() => handleDeleteUserMovie(movie)}>
                            Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserMovieList;
