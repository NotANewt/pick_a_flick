import React, { useState, useEffect } from "react";
import { Jumbotron, Container, CardColumns, Card, Button } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_DEALBREAKER } from "../utils/queries";
import { SAVE_USER_DEALBREAKER } from "../utils/mutations";

const Dealbreakers = () => {
  // set mutation
  const [saveUserDealbreaker, { error }] = useMutation(SAVE_USER_DEALBREAKER);

  // Query database to get all dealbreakers and populate into a dropdown
  const { loading, data } = useQuery(QUERY_DEALBREAKER);

  const dealbreakerData = data?.dealbreaker || {};

  if (loading) {
    return <h2>LOADING...</h2>;
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
  };

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
