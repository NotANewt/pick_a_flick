import React, { useState, useEffect } from "react";
import { Container, Col, Row, Image, Form, Button, Badge, Spinner } from "react-bootstrap";
import { useParams, Navigate, Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { SAVE_USER_MOVIE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_USER_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";

function MovieDetails() {
  const [removeUserMovie, { error: errorRemove }] = useMutation(REMOVE_USER_MOVIE);
  const [saveUserMovie, { data, error }] = useMutation(SAVE_USER_MOVIE);
  const {
    loading: loadingMe,
    data: dataMe,
    refetch,
  } = useQuery(QUERY_ME, {
    onCompleted: (dataMe) => {
      console.log("completed query", dataMe);
    },
  });

  const userData = dataMe?.me || [];

  // create state for holding returned doesthedogdie api data
  const [searchedMovieDetails, setSearchedMovieDetails] = useState([]);
  const { dddId } = useParams();

  // call getDealbreakers function on page load
  useEffect(() => {
    getDealbreakers();
  }, []);

  // api call from does the dog die to get movie media information, including dealbreakers
  const getDealbreakers = async () => {
    try {
      // if using cors-anywhere
      //
      // const options = {
      //   method: "GET",
      //   crossDomain: true,
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "X-API-KEY": process.env.REACT_APP_DDD_KEY,
      //   },
      // };

      // // TODO: remove this when not working on localhost
      // const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;

      // const url = `${corsAnywhere}https://www.doesthedogdie.com/media/${dddId}`;

      const url = `http://teamdavies.net/pickaflick/api.php?media=${dddId}`;

      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //Set the response data if we have movies

          // pull out only the dealbreakers from the data
          const dealbreakers = data.topicItemStats;

          // filter out the dealbreakers so only the ones with more yes than no votes are included
          const movieDealbreakers = dealbreakers.filter((db) => db.yesSum > db.noSum).map((db) => db.topic.name);

          const movieDetails = {
            dddId: data.item.id,
            movieDbId: data.item.tmdbId,
            title: data.item.name,
            year: data.item.releaseYear,
            genre: data.item.genre,
            overview: data.item.overview,
            posterImage: `https://image.tmdb.org/t/p/original/${data.item.posterImage}`,
            dealbreakers: movieDealbreakers,
          };
          setSearchedMovieDetails(movieDetails);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  // handle user clicking save movie button
  const handleSaveMovie = async (movieData) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      window.location.replace("/LoginSignup");
    }

    try {
      saveUserMovie({
        variables: {
          movieData,
        },
      });
    } catch (err) {
      console.error(err);
    }

    refetch();
  };

  //handle user clicking button to delete a movie
  const handleDeleteUserMovie = async (movie) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return <Navigate to="./LoginSignup" />;
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

  console.log("userData.movies", userData.movies);
  console.log("searchedMovieDetails", searchedMovieDetails?.dddId);

  const searchedMovieDetailsdddId = searchedMovieDetails?.dddId;
  console.log("searchedMovieDetailsdddId", searchedMovieDetailsdddId);

  // check if the movie has already been added to the user
  const filteredMovies = userData?.movies?.filter((movie) => searchedMovieDetailsdddId == movie.dddId);
  const hasMovie = filteredMovies?.length > 0;

  // set variables that will be used in the return
  let theBadgeBg = "dark";
  let foundDealbreaker = false;

  if (!searchedMovieDetails.title) {
    return (
      <>
        <Container>
          <center>
            <Spinner animation="border"></Spinner> Loading Movie
          </center>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
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
                userData.dealbreakers?.includes(dealbreaker) ? ((theBadgeBg = "danger"), (foundDealbreaker = true)) : (theBadgeBg = "dark");
                return (
                  <Badge key={dealbreaker} bg={theBadgeBg} style={{ marginRight: "5px", textTransform: "capitalize" }}>
                    {dealbreaker}
                  </Badge>
                );
              })}
            </div>
            <br />
            {/* if movie has one of the user's dealbreaker, show a div to notify user */}
            {foundDealbreaker === true && <div>This movie contains one of your dealbreakers.</div>}
            {/* if movie does not have one of the user's dealbraekers and the movie is not already save to the user, show the Save Movie button */}
            {foundDealbreaker === false && hasMovie === false && (
              <Button variant="outline-success" onClick={() => handleSaveMovie(searchedMovieDetails)}>
                Save Movie
              </Button>
            )}
            {/* if movie has already been saved to a user, show the Remove Movie button */}
            {hasMovie === true && (
              <Button variant="outline-danger" onClick={() => handleDeleteUserMovie(searchedMovieDetails)}>
                Remove Movie
              </Button>
            )}

            <br />
            <Button variant="outline-primary" href="/Movies" style={{ marginTop: "1rem" }}>
              Back To Search
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default MovieDetails;
