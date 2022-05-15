import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

//
const MovieSearch = () => {
  // create state for holding returned doesthedogdie api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // if the search input was empty
    if (!searchInput) {
      // snackbar to notify user that no movies were found in the search
      const x = document.getElementById("snackbar");
      // Add the "show" class to DIV
      x.classList.add("show");
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    }

    // fetch from does the dog die
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

      const url = `${corsAnywhere}https://www.doesthedogdie.com/dddsearch?q=${searchInput}`;

      const response = await fetch(url, options);
      const { items } = await response.json();

      // if the search returned no movies
      if (items.length == 0) {
        // snackbar to notify user that no movies were found in the search
        const x = document.getElementById("snackbar");
        // Add the "show" class to DIV
        x.classList.add("show");
        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 3000);
      }

      const movieData = items
        // filter through movieData to remove any items that are missing tmdbId, poster images, genres, or nave no user ratings
        .filter((movie) => movie.tmdbId !== null)
        .filter((movie) => movie.posterImage !== null)
        .filter((movie) => movie.genre !== null)
        .filter((movie) => movie.numRatings > 0)
        // map through remaining items and take out relevant data
        .map((movie) => ({
          dddId: movie.id,
          movieDbId: movie.tmdbId,
          title: movie.name,
          year: movie.releaseYear,
          genre: movie.genre,
          overview: movie.overview,
          posterImage: `https://image.tmdb.org/t/p/w200/${movie.posterImage}`,
        }))
        // sort by number of user ratings
        .sort((a, b) => (a.numRatings > b.numRatings ? -1 : 1));

      // set state
      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <hr />
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" size="lg" placeholder="Search for a movie" />
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success" size="lg">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
        <hr />
      </Container>

      <Container>
        <div id="snackbar">No search results. Please try again.</div>
        <Row>
          {searchedMovies.map((movie) => {
            return (
              <Col lg="3" key={movie.dddId}>
                <Card border="dark" style={{ marginBottom: "2rem" }}>
                  {movie.posterImage ? <Card.Img src={movie.posterImage} alt={`The movie poster ${movie.title}`} variant="top" /> : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className="small">Release Year: {movie.year}</p>
                    <p className="small">Genre: {movie.genre}</p>
                    <Link to={`MovieDetails/${movie.dddId}`}>View Movie Details</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default MovieSearch;
