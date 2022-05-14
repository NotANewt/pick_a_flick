import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Col, Row, Image, Form, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { SAVE_USER_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";

function MovieDetails() {
  const [saveUserMovie, { data, error }] = useMutation(SAVE_USER_MOVIE);

  // create state for holding returned doesthedogdie api data
  const [searchedMovieDetails, setSearchedMovieDetails] = useState([]);
  const { dddId } = useParams();
  console.log(dddId);

  useEffect(() => {
    getDealbreakers();
  }, []);

  const getDealbreakers = async () => {
    try {
      const options = {
        method: "GET",
        crossDomain: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": process.env.REACT_APP_DDD_KEY,
        },
      };

      // TODO: remove this when not working on localhost
      const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;

      const url = `${corsAnywhere}https://www.doesthedogdie.com/media/${dddId}`;

      console.log(url);

      await fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //Set the response data if we have movies
          console.log(data);

          const dealbreakers = data.topicItemStats;

          const movieDealbreakers = dealbreakers.filter((db) => db.yesSum > db.noSum).map((db) => db.topic.name);

          const movieDetails = {
            dddId: data.item.id,
            movieDbId: data.item.tmdbId,
            title: data.item.name,
            year: data.item.releaseYear,
            genre: data.item.genre,
            overview: data.item.overview,
            posterImage: `https://image.tmdb.org/t/p/w200/${data.item.posterImage}`,
            dealbreakers: movieDealbreakers,
          };
          console.log(movieDetails);
          setSearchedMovieDetails(movieDetails);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieData) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log(movieData);
      saveUserMovie({
        variables: {
          movieData,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Row key={searchedMovieDetails.dddId}>
        <Col lg={4}>{searchedMovieDetails.posterImage ? <Image src={searchedMovieDetails.posterImage} alt={`The movie poster ${searchedMovieDetails.title}`} fluid={true} /> : null}</Col>

        <Col>
          <h3>{searchedMovieDetails.title}</h3>
          <p className="small">Release Year: {searchedMovieDetails.year}</p>
          <p className="small">Genre: {searchedMovieDetails.genre}</p>
          <p>{searchedMovieDetails.overview}</p>
          <hr />
          <div>
            {searchedMovieDetails.dealbreakers?.map((dealbreaker) => {
              return (
                <Badge key={dealbreaker} bg="dark" text="light" style={{ marginRight: "5px", textTransform: "capitalize" }}>
                  {dealbreaker}
                </Badge>
              );
            })}
          </div>
        </Col>
        <Button className="btn-block btn-info" onClick={() => handleSaveMovie(searchedMovieDetails)}>
          Save Movie
        </Button>
      </Row>
    </>
  );
}
export default MovieDetails;
