import React, { useState, useEffect } from "react";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_DEALBREAKER } from "../utils/queries";

const handleButtonClick = () => {
  const value = document.getElementById("mySelect").value;
  console.log(value);
};

const Dealbreakers = () => {
  // Query database to get all dealbreakers and populate into a dropdown
  const { loading, data } = useQuery(QUERY_DEALBREAKER);

  const dealbreakerData = data?.dealbreaker || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // what is returned
  return (
    <>
      <select id="mySelect">
        {dealbreakerData.map((dealbreaker) => {
          return (
            <option key={dealbreaker._id} id={dealbreaker._id}>
              {dealbreaker.name}
            </option>
          );
        })}
      </select>
      <Button className="btn-info" onClick={() => handleButtonClick()}>
        Add Dealbreaker
      </Button>
    </>
  );
};

export default Dealbreakers;
