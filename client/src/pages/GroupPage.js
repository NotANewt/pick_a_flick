import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Card, Col, Row, Image, Form, Button, Badge } from "react-bootstrap";

import { GroupMovieList, GroupUserMovieList } from "../components/Groups";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_GROUP, QUERY_USER } from "../utils/queries";
import { ADD_USER_TO_GROUP, REMOVE_MOVIE_FROM_GROUP, SAVE_USER_MOVIE_TO_GROUP } from "../utils/mutations";

function getDealbreakersFromGroupUsers(userDBData, groupUserIds) {
  let outputGroupDealbreakers = [];
  // Loop through the users to find users who are in this group and then grab their dealbreakers to output in a concat array
  if (userDBData.length > 0) {
    userDBData.forEach((u) => {
      if (groupUserIds?.includes(u._id)) {
        outputGroupDealbreakers = outputGroupDealbreakers.concat(u.dealbreakers);
      }
    });
  }
  return outputGroupDealbreakers;
}

// pick a random movie
function pickAFlick(groupDBData) {
  return groupDBData.movies[Math.floor(Math.random() * groupDBData.movies.length)];
}

function GroupPage() {
  const { _id } = useParams();
  const paramsGroupId = _id;

  // User will be added to group if they correctly fill out the group joincode
  const [addUserToGroup, { error: addUserToGroupError }] = useMutation(ADD_USER_TO_GROUP);
  // Admin, Users and Pick Action can all remove movies fro the group on this page
  const [removeMovieFromGroup, { error: removeMovieFromGroupError }] = useMutation(REMOVE_MOVIE_FROM_GROUP);
  const [saveUserMovieToGroup, { error: errorSave }] = useMutation(SAVE_USER_MOVIE_TO_GROUP);

  // query the user to get the userData
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
  const meDBData = dataMe?.me || [];
  if (!loadingMe) console.log("loaded me data");

  // Currently quereying all users - will update to query user by id in the future
  const { loading: loadingUsers, data: dataUsers } = useQuery(QUERY_USER);
  const usersDBData = dataUsers?.user || [];
  if (!loadingUsers) console.log("loaded user data");

  // Currently quereying all groups - will update to query group by id in the future
  const { loading: loadingGroup, data: dataGroup, refetch } = useQuery(QUERY_GROUP);
  const groupTempData = dataGroup?.group.filter((group) => group._id.includes(paramsGroupId) == true) || [];
  //TEMP FIX
  const groupDBData = groupTempData[0];

  if (!loadingGroup) console.log("loaded group data");

  let groupDealbreakers = getDealbreakersFromGroupUsers(usersDBData, groupDBData?.users);

  // get group users usernames to show on page
  let outputGroupUsers = [];

  if (usersDBData.length > 0) {
    usersDBData.forEach((u) => {
      if (groupDBData?.users.includes(u._id)) {
        outputGroupUsers = outputGroupUsers.concat(u.username);
      }
    });
  }
  console.log("outputGroupUsers", outputGroupUsers);

  // prevent default when user submits Join Group form, then call handleJoinGroup and send join code
  const handleJoinGroupForm = (e) => {
    e.preventDefault();
    const joinCode = document.getElementById("joincode").value;
    handleJoinGroup(joinCode);
  };

  // Function to handle when a user tries to join a group with a join code
  const handleJoinGroup = async (joinCode) => {
    if (joinCode === groupDBData.joincode) {
      const id = String(paramsGroupId);
      const user = meDBData._id;

      try {
        const { data } = await addUserToGroup({
          variables: {
            id: id,
            user: user,
          },
        });
      } catch (err) {
        console.error(err);
      }
      refetch();
    } else {
      console.log("wrong join code");
    }
  };

  const handleRemoveMovieFromGroup = async (movieID) => {
    const movieData = { dddId: movieID };
    const id = String(paramsGroupId);
    //Remove the movie!
    const { data } = await removeMovieFromGroup({
      variables: {
        id: id,
        movieData: movieData,
      },
    });
    refetch();
  };

  const handleAddMovieToGroup = async (movie) => {
    let isInGroup = false;
    groupDBData.movies.forEach((groupMovie) => {
      if (groupMovie.dddId == movie.dddId) {
        console.log("this movie is already in this group");
        isInGroup = true;
      }
    });

    if (isInGroup) return false;

    const id = String(paramsGroupId);
    const movieData = {
      dddId: movie.dddId,
      movieDbId: movie.movieDbId,
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      overview: movie.overview,
      posterImage: movie.posterImage,
      dealbreakers: movie.dealbreakers,
    };

    const { data } = await saveUserMovieToGroup({
      variables: {
        id: id,
        movieData: movieData,
      },
    });

    refetch();
  };

  // Function to handle the removing of amovies with dealbreakers from our group
  const handleRemoveMoviesWithDealbreakers = () => {
    //loop through the groups movies
    groupDBData?.movies.forEach(async (movie) => {
      //set out deabreaker flag to 0
      let foundDealbreaker = 0;

      // Loop through the dealbreakers
      groupDealbreakers.forEach((dealbreaker) => {
        // if the dealbreaker exists on a movie increment our flag (use boolean as int)
        foundDealbreaker = foundDealbreaker + movie.dealbreakers.includes(dealbreaker);
      });

      // if we found any dealberakers lets remove the movie from the group!
      if (foundDealbreaker > 0) {
        handleRemoveMovieFromGroup(movie.dddId);
      }
    });
  };

  // PICKING OUR FINAL FLICK!
  const handlePickAFlick = () => {
    const pickedMovie = pickAFlick(groupDBData);

    // Delete the rest of these losers
    groupDBData.movies.forEach(async (movie) => {
      if (movie.dddId != pickedMovie.dddId) {
        handleRemoveMovieFromGroup(movie.dddId);
      }
    });
  };

  // when user clicks the Save Group Link button, the value is saved to their clipboard
  function handleCopyGroupLink() {
    /* Get the text field */
    const copyGroupLinkButton = document.getElementById("copyGroupLinkButton");

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyGroupLinkButton.value);

    // snackbar to notify user
    const x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.classList.add("show");
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);

    // remove the active class from the button
    copyGroupLinkButton.classList.remove("btn-active");
  }

  // If you are part of this group
  if (groupDBData?.users.includes(meDBData._id)) {
    return (
      <>
        <div id="snackbar">Copied Group Link.</div>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>Welcome to {groupDBData.groupname}</Card.Title>
              <Card.Text>{groupDBData.description}</Card.Text>
              <Card.Text>Group members: {outputGroupUsers.join(", ")}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="my-4">
            <Card.Body>
              <Card.Title>Group Info</Card.Title>
              <Card.Text>Send a friend the group link and join code for them to join in on the fun!</Card.Text>
              <Button id="copyGroupLinkButton" className="mb-2" variant="outline-primary" onClick={() => handleCopyGroupLink()} value={window.location.href}>
                Copy Group Link
              </Button>
              <Card.Text>Join Code: {groupDBData.joincode}</Card.Text>
            </Card.Body>
          </Card>

          <GroupMovieList movies={groupDBData.movies} handleRemoveMovie={handleRemoveMovieFromGroup} />

          <Card className="my-4">
            <Card.Body className="mx-auto">
              <Button variant="outline-danger" onClick={() => handleRemoveMoviesWithDealbreakers()}>
                Remove Movies with Dealbreakers
              </Button>
            </Card.Body>
          </Card>

          <Card className="my-4">
            <Card.Body className="mx-auto">
              <Button variant="outline-success" onClick={() => handlePickAFlick()}>
                Pick A Flick!
              </Button>
            </Card.Body>
          </Card>

          <GroupUserMovieList movies={meDBData.movies} handleAddMovie={handleAddMovieToGroup} />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>Enter the Join Code below to access the group.</Card.Title>
              <Form onSubmit={handleJoinGroupForm}>
                <Form.Group>
                  <Form.Control className="my-4" type="text" placeholder="join code" id="joincode"></Form.Control>
                  <Button variant="outline-success" type="submit">
                    Join Group
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}
export default GroupPage;
