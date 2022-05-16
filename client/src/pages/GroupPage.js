import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Container, Col, Row, Image, Form, Button, Badge } from "react-bootstrap";

import { UserMovieListForGroup } from "../components/UserMovies";

import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_GROUP } from "../utils/queries";

function GroupPage() {
  // useParams to get the group id number
  const { _id } = useParams();

  const thisGroupId = _id;

  console.log("thisGroupId", thisGroupId);

  // query the user to get favorite movies and dealbreakers
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);

  const userData = dataMe?.me || [];

  console.log("userData", userData);

  // query group to get the data for this group by id
  const { loading, data } = useQuery(QUERY_GROUP);
  const groupData = data?.group || [];

  console.log("groupData", groupData);

  const thisGroupDataArray = groupData?.filter((group) => group._id.includes(thisGroupId) == true);

  console.log("thisGroupDataArray", thisGroupDataArray);

  const thisGroupData = thisGroupDataArray[0];

  console.log("thisGroupData", thisGroupData);

  return (
    <>
      <h2>Welcome to {thisGroupData?.groupname}</h2>
      <p>{thisGroupData?.description}</p>
      <UserMovieListForGroup />
    </>
  );
}
export default GroupPage;
