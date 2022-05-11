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
    <>
      <Container>
        <CardColumns>
          {dealbreakerData.map((dealbreaker) => {
            return (
              <Card key={dealbreaker._id} border="dark">
                <Card.Body>
                  <Card.Title>{dealbreaker.name}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Dealbreakers;
