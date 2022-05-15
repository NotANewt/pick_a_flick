import React, { useState, useEffect } from "react";
import { Card, Button, ButtonGroup, Row, Col, Stack, Form, Badge } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_DEALBREAKER, QUERY_ME } from "../utils/queries";
import { SAVE_USER_DEALBREAKER, REMOVE_USER_DEALBREAKER } from "../utils/mutations";

import Auth from "../utils/auth";

const Dealbreaker = (props) => {
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);
  const [removeUserDealbreaker, { error: errorRemove }] = useMutation(REMOVE_USER_DEALBREAKER);

  //handle user clicking button to delete a dealbreaker
  const handleDeleteUserDealbreaker = async (dealbreaker) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeUserDealbreaker({
        variables: { dealbreaker: dealbreaker },
      });
    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  // Dealbreaker card with delete button
  return (
    <ButtonGroup size="sm" className="mb-2, me-2">
      <Button disabled variant="dark" style={{ textTransform: "capitalize", opacity: 1 }}>
        {props.dealbreaker}
      </Button>
      <Button variant="danger" onClick={() => handleDeleteUserDealbreaker(props.dealbreaker)}>
        Remove
      </Button>
    </ButtonGroup>
  );
};

// List of saved user dealbreakers
const DealbreakerList = (props) => {
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);

  const userData = dataMe?.me || {};

  if (loadingMe) {
    return <h2>LOADING SAVED DEALBREAKERS...</h2>;
  }

  return (
    <>
      <h2>{userData.dealbreakers.length ? `Saved dealbreakers:` : "You have no saved dealbreakers"}</h2>
      {userData.dealbreakers?.map((dealbreaker) => {
        return <Dealbreaker key={dealbreaker} dealbreaker={dealbreaker} />;
      })}
    </>
  );
};

// Search database to get all available dealbreakers and use to create dropdown menu
// Dropdown is filtered as user types in search criteria
// Button adds a new dealbreaker to a user
// Button removes dealbreaker from user
const Dealbreakers = () => {
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);
  // set mutations
  const [saveUserDealbreaker, { error }] = useMutation(SAVE_USER_DEALBREAKER);

  const [filteredDealbreakers, setFilteredDealbreakers] = useState([]);

  // Query database to get all dealbreakers and populate into a dropdown

  const { loading, data } = useQuery(QUERY_DEALBREAKER, {
    onCompleted: (data) => {
      setFilteredDealbreakers(data.dealbreaker);
    },
  });

  const dealbreakerData = data?.dealbreaker || {};

  console.log(filteredDealbreakers);

  if (loading) {
    return false;
  }

  //handle user filter
  const handleFilterDealbreakers = () => {
    const dealbreakerfilter = document.getElementById("filter").value;

    const filteredDeals = dealbreakerData.filter((db) => db.name.includes(dealbreakerfilter) == true);

    setFilteredDealbreakers(filteredDeals);
  };

  // handle user clicking button to add new dealbreaker
  const handleButtonClick = () => {
    const dealbreakerName = document.getElementById("mySelect").value;
    handleSaveDealbreaker(dealbreakerName);
  };

  // handle saving a dealbreaker to a user
  function handleSaveDealbreaker(dealbreakerName) {
    // check if dealbreaker is in the user array
    if (dataMe?.me.dealbreakers.includes(dealbreakerName)) {
      // snackbar to notify user
      const x = document.getElementById("snackbar");
      // Add the "show" class to DIV
      x.classList.add("show");
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    } else {
      saveDealbreaker(dealbreakerName);
    }
  }

  // create function to handle saving a dealbreaker to the database
  const saveDealbreaker = async (dealbreakerName) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

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
      <div id="snackbar">That dealbreaker is already in your list.</div>
      <hr />
      <Form>
        <Stack direction="horizontal" gap={3}>
          <Form.Select id="mySelect">
            {filteredDealbreakers.map((dealbreaker) => {
              return (
                <option key={dealbreaker._id} id={dealbreaker._id}>
                  {dealbreaker.name}
                </option>
              );
            })}
          </Form.Select>

          <Button variant="primary" onClick={() => handleButtonClick()}>
            Save
          </Button>

          <Form.Control id="filter" placeholder="filter list" onChange={() => handleFilterDealbreakers()}></Form.Control>
        </Stack>
      </Form>

      <hr />
      <DealbreakerList />
    </>
  );
};

export { Dealbreaker, Dealbreakers, DealbreakerList };
