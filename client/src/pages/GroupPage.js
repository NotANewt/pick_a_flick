import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Col, Row, Image, Form, Button, Badge } from "react-bootstrap";

import { UserMovieListForGroup } from "../components/UserMovies";
import { GroupMovieList } from "../components/Groups";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_GROUP } from "../utils/queries";

function GroupPage() {
  // useParams to get the group id number
  const { _id } = useParams();

  const thisGroupId = _id;

  // query the user to get favorite movies and dealbreakers
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);

  const userData = dataMe?.me || [];

  // query group to get the data for this group by id
  const { loading, data } = useQuery(QUERY_GROUP);
  const groupData = data?.group || [];

  const thisGroupDataArray = groupData?.filter((group) => group._id.includes(thisGroupId) == true);

  const thisGroupData = thisGroupDataArray[0];

  const handleJoinGroup = (e) => {
    e.preventDefault();
    const thisGroupJoinCode = thisGroupData.joincode;
    const userProvidedJoinCode = document.getElementById("joincode").value;

    console.log("thisGroupJoinCode", thisGroupJoinCode);
    console.log("userProvidedJoinCode", userProvidedJoinCode);

    if (thisGroupJoinCode == userProvidedJoinCode) {
      console.log("joining group");
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
