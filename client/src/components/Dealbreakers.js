import React, { useState, useEffect } from "react";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_DEALBREAKER } from "../utils/queries";

const Dealbreakers = () => {
  const { loading, data } = useQuery(QUERY_DEALBREAKER);

  const dealbreakerData = data?.dealbreaker || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <select>
      {dealbreakerData.map((dealbreaker) => {
        return (
          <option key={dealbreaker._id} id={dealbreaker._id}>
            {dealbreaker.name}
          </option>
        );
      })}
    </select>
  );
};

export default Dealbreakers;
