import React, { useState, useEffect } from "react";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_DEALBREAKER, QUERY_ME } from "../utils/queries";
import { SAVE_USER_DEALBREAKER } from "../utils/mutations";

const Dealbreakers = () => {
  // set mutation
  const [saveUserDealbreaker, { error }] = useMutation(SAVE_USER_DEALBREAKER);

  // Query database to get all dealbreakers and populate into a dropdown
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);
  const { loading, data } = useQuery(QUERY_DEALBREAKER);

  const dealbreakerData = data?.dealbreaker || {};
  const userData = dataMe?.me || {};

  console.log("dealbreakers", dealbreakerData);
  console.log("user Data", userData);

  if (loading) {
    return <h2>LOADING DROPDOWN...</h2>;
  }

  if (loadingMe) {
    return <h2>LOADING SAVED DEALBREAKERS...</h2>;
  }

  // handle user clicking button to add new dealbreaker
  const handleButtonClick = () => {
    const dealbreakerName = document.getElementById("mySelect").value;
    handleSaveDealbreaker(dealbreakerName);
  };

  // create function to handle saving a dealbreaker to the database
  const handleSaveDealbreaker = async (dealbreakerName) => {
    console.log("starting handleSaveDealbreaker");
    if (!dealbreakerName) {
      return false;
    }

    try {
      const { data } = await saveUserDealbreaker({
        variables: { dealbreaker: dealbreakerName },
      });
    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  // what is returned
  return (
    <>
      <h2>Peruse and pick your dealbreakers using the dropdown</h2>
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
      <Container>
        <h2>{userData.length ? `Viewing saved dealbreakers:` : "You have no saved dealbreakers"}</h2>
        <CardColumns>
          {userData.dealbreakers?.map((dealbreaker) => {
            return (
              <Card key={dealbreaker} border="dark">
                <Card.Body>
                  <Card.Title>{dealbreaker}</Card.Title>
                  <Button className="btn-block btn-danger">Delete this Dealbreaker!</Button>
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
