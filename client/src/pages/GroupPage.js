import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Col, Row, Image, Form, Button, Badge } from "react-bootstrap";

import { GroupMovieList, UserMovieListForGroup } from "../components/Groups";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_GROUP, QUERY_USER } from "../utils/queries";
import { ADD_USER_TO_GROUP, REMOVE_MOVIE_FROM_GROUP } from "../utils/mutations";

function GroupPage() {
  // useParams to get the group id number
  const { _id } = useParams();

  const thisGroupId = _id;

  // mutation to save a user to a group
  const [addUserToGroup, { error }] = useMutation(ADD_USER_TO_GROUP);

  const [removeMovieFromGroup, { error: removeMovieError }] = useMutation(REMOVE_MOVIE_FROM_GROUP);

  // query the user to get favorite movies and dealbreakers
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);
  const { loading: loadingUsers, data: dataUsers } = useQuery(QUERY_USER);

  const userData = dataMe?.me || [];

  const allUserData = dataUsers?.user || [];

  console.log("allUserData", allUserData);

  // query group to get the data for this group by id
  const { loading, data } = useQuery(QUERY_GROUP);
  const groupData = data?.group || [];

  const thisGroupDataArray = groupData?.filter((group) => group._id.includes(thisGroupId) == true);

  const thisGroupData = thisGroupDataArray[0];

  // query Group and Users

  const groupUserIds = thisGroupData?.users;
  const userDBData = allUserData;

  let groupUsers = [];
  let groupDealbreakers = [];

  // TODO: ask Scott how to query the database for users that are part of an array
  if (userDBData.length > 0) {
    userDBData.forEach((u) => {
      if (groupUserIds?.includes(u._id)) {
        groupUsers.push(u);
        groupDealbreakers = groupDealbreakers.concat(u.dealbreakers);
      }
    });
  }

  const handleRemoveMoviesWithDealbreakers = () => {
    console.log("thisGroupData.movies", thisGroupData.movies);
    thisGroupData?.movies.forEach(async (movie) => {
      let foundDealbreaker = 0;

      groupDealbreakers.forEach((d) => {
        foundDealbreaker = foundDealbreaker + movie.dealbreakers.includes(d);
      });
      if (foundDealbreaker > 0) {
        console.log("deleting movie", movie.title);

        const movieData = { dddId: movie.dddId };

        const id = String(thisGroupId);

        const { data } = await removeMovieFromGroup({
          variables: {
            id: id,
            movieData: movieData,
          },
        });
      }
    });
    location.reload();
  };

  const handlePickAFlick = () => {
    let pickedMovie = thisGroupData.movies[Math.floor(Math.random() * thisGroupData.movies.length)];
    console.log("pickedMovie", pickedMovie);

    thisGroupData.movies.forEach(async (movie) => {
      if (movie.dddId != pickedMovie.dddId) {
        const movieData = { dddId: movie.dddId };

        const id = String(thisGroupId);

        const { data } = await removeMovieFromGroup({
          variables: {
            id: id,
            movieData: movieData,
          },
        });
      }
    });
    // TODO: fix the refetch
    alert(`Your movie is ${pickedMovie.title}!`);
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    const thisGroupJoinCode = thisGroupData.joincode;
    const userProvidedJoinCode = document.getElementById("joincode").value;

    if (thisGroupJoinCode == userProvidedJoinCode) {
      const id = String(thisGroupId);
      const user = userData._id;

      try {
        const { data } = await addUserToGroup({
          variables: {
            id: id,
            user: user,
          },
        });
        console.log(data);
      } catch (err) {
        console.error(err);
      }
      refetch();
      // TODO: re organize code so the group's movie list refetches when a movie is saved to it
      location.reload();
    } else {
      console.log("wrong join code");
    }
  };

  if (thisGroupData?.users.includes(userData._id)) {
    return (
      <>
        <Container>
          <h2>Welcome to {thisGroupData?.groupname}</h2>
          <p>{thisGroupData?.description}</p>
          <GroupMovieList />
          <Button onClick={() => handleRemoveMoviesWithDealbreakers()}>Remove Movies with Dealbreakers</Button>
          <Button onClick={() => handlePickAFlick()}>Pick A Flick!</Button>
          <UserMovieListForGroup thisGroupId={thisGroupId} />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <h2>Join Group Form</h2>
        <Form onSubmit={handleJoinGroup}>
          <Form.Group>
            <Form.Control type="text" placeholder="join code" id="joincode"></Form.Control>
            <Button type="submit">Join Group</Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}
export default GroupPage;
