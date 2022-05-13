import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from "react-bootstrap";
import { useParams } from "react-router-dom";

function MovieDetails() {
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
        })
        .catch((e) => {
          console.log(e.message);
        });

      // console.log(url);

      // const response = await fetch(url, options);

      // const { items } = await response.json();

      // const dealbreakerList = items;

      // console.log(dealbreakerList);

      // setSearchedDealbreakers(dealbreakerList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>This is the Movie Details page</h1>
      {dddId}
    </>
  );
}
export default MovieDetails;
