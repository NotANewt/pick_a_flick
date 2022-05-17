import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_GROUP, REMOVE_GROUP, REMOVE_MOVIE_FROM_GROUP, SAVE_USER_MOVIE_TO_GROUP } from "../utils/mutations";
import { QUERY_ME, QUERY_GROUP } from "../utils/queries";

import Auth from "../utils/auth";

// The create a group form on the Profile Page
const CreateGroupForm = () => {
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);

  const userData = dataMe?.me || [];

  // set initial form state
  const [groupFormData, setGroupFormData] = useState({
    groupname: "",
    description: "",
    joincode: "",
    admin: "",
    users: "",
  });

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addGroup, { error }] = useMutation(ADD_GROUP);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGroupFormData({ ...groupFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      groupFormData.admin = userData._id;
      groupFormData.users = userData._id;

      const { data } = await addGroup({
        variables: { ...groupFormData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setGroupFormData({
      groupname: "",
      description: "",
      joincode: "",
      admin: "",
      users: "",
    });
  };

  return (
    <>
      <Container>
        {/* This is needed for the validation functionality */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* show alert if server response is bad */}
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with creating your group.
          </Alert>

          <h2>Create A New Group</h2>

          <Form.Group>
            <Form.Label htmlFor="groupname">Group Name</Form.Label>
            <Form.Control type="text" placeholder="Give your movie group a name!" name="groupname" onChange={handleInputChange} value={groupFormData.groupname} required />
            <Form.Control.Feedback type="invalid">A name is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="description">Group Description</Form.Label>
            <Form.Control type="text" placeholder="What's this group all about!" name="description" onChange={handleInputChange} value={groupFormData.description} required />
            <Form.Control.Feedback type="invalid">A description is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="joincode">Join Code</Form.Label>
            <Form.Control type="text" placeholder="Create a code to share this group" name="joincode" onChange={handleInputChange} value={groupFormData.joincode} required />
            <Form.Control.Feedback type="invalid">A description join code is required!</Form.Control.Feedback>
          </Form.Group>

          <Button disabled={!(groupFormData.groupname && groupFormData.description)} type="submit" variant="success">
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
};

// The users list of groups on the Profile Page
const UserGroupList = () => {
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
  const userData = dataMe?.me || [];

  const userId = userData._id;

  const { loading, data, refetch } = useQuery(QUERY_GROUP);
  const groupData = data?.group || [];

  const myGroups = groupData?.filter((group) => group.users.includes(userId) == true);

  const [removeGroup, { error: errorRemove }] = useMutation(REMOVE_GROUP);

  //handle user clicking button to delete a group
  const handleDeleteUserGroup = async (group) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      window.location.replace("/LoginSignup");
    }

    const id = group._id;

    try {
      const { data } = await removeGroup({
        variables: { id: id },
      });
    } catch (err) {
      console.error(err);
    }
    refetch();
  };

  return (
    <>
      <Container>
        <h2>{myGroups.length ? `My groups:` : "You do not have any groups"}</h2>
        <Row>
          {myGroups.map((group) => {
            return (
              <Col lg={3} key={group._id}>
                <Card border="dark" style={{ marginBottom: "2rem" }}>
                  <Card.Body className="d-grid gap-2">
                    <Card.Title>{group.groupname}</Card.Title>
                    <Card.Text>{group.description}</Card.Text>
                    <Card.Text>join code: {group.joincode}</Card.Text>
                    <Link to={`../GroupPage/${group._id}`}>Go To Group</Link>
                    <Button className="btn-danger" onClick={() => handleDeleteUserGroup(group)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

// Remove a movie from a group
// Show group's movies
const GroupMovieList = () => {
  const [removeMovieFromGroup, { error }] = useMutation(REMOVE_MOVIE_FROM_GROUP);
  const { loading, data, refetch } = useQuery(QUERY_GROUP);
  const groupData = data?.group || [];

  const { _id } = useParams();

  const thisGroupId = _id;
  console.log("thisGroupId", thisGroupId);

  console.log("groupData", groupData);

  const thisGroupDataArray = groupData?.filter((group) => group._id.includes(thisGroupId) == true);

  console.log("thisGroupDataArray", thisGroupDataArray);

  const thisGroupData = thisGroupDataArray[0];

  console.log("thisGroupData", thisGroupData);

  const thisGroupDataMovieArray = thisGroupData?.movies;

  console.log("thisGroupDataMovieArray", thisGroupDataMovieArray);

  const handleDeleteGroupMovie = async (movie) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      window.location.replace("/LoginSignup");
    }

    const movieData = { dddId: movie.dddId };

    const id = String(thisGroupId);

    console.log("id", id);

    try {
      const { data } = await removeMovieFromGroup({
        variables: {
          id: id,
          movieData: movieData,
        },
      });
    } catch (err) {
      console.error(err);
    }
    refetch();

    console.log("Delete button was pressed.");
  };

  return (
    <>
      <Container>
        <h2>{thisGroupDataMovieArray?.length ? `Group's movies:` : "This group has no saved movies"}</h2>
        <Row>
          {thisGroupDataMovieArray?.map((movie) => {
            return (
              <Col lg={3} key={movie.title}>
                <Card border="dark" style={{ marginBottom: "2rem" }}>
                  <Card.Img variant="top" src={movie.posterImage} alt={`The movie poster ${movie.title}`} />
                  <Card.Body className="d-grid gap-2">
                    <Button style={{ marginBottom: "1rem", marginTop: "1rem" }} href={`../Movies/MovieDetails/${movie.dddId}`}>
                      View Movie Details
                    </Button>
                    <Button className="btn-danger" onClick={() => handleDeleteGroupMovie(movie)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

// Save a user's movie to the group
// Show list of user's movies on the GroupPage
const UserMovieListForGroup = (props) => {
  const [saveUserMovieToGroup, { error: errorSave }] = useMutation(SAVE_USER_MOVIE_TO_GROUP);
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);
  const userData = dataMe?.me || {};

  if (loadingMe) {
    return <h2>LOADING SAVED MOVIES...</h2>;
  }

  //handle user clicking button to add a movie to the group
  const handleSaveUserMovieToGroup = async (movie) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return <Navigate to="./LoginSignup" />;
    }

    const id = String(props.thisGroupId);

    console.log("id", id);

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

    try {
      const { data } = await saveUserMovieToGroup({
        variables: {
          id: id,
          movieData: movieData,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    refetch();
    // TODO: re organize code so the group's movie list refetches when a movie is saved to it
    // location.reload();
  };

  return (
    <>
      <h2>{userData.movies.length ? `Your saved movies:` : "You have no saved movies to add to this group"}</h2>
      <Row>
        {userData.movies?.map((movie) => {
          return (
            <Col lg={3} key={movie.title}>
              <Card border="dark" style={{ marginBottom: "2rem" }}>
                <Card.Img variant="top" src={movie.posterImage} alt={`The movie poster ${movie.title}`} />
                <Card.Body className="d-grid gap-2">
                  <Button style={{ marginBottom: "1rem", marginTop: "1rem" }} href={`../Movies/MovieDetails/${movie.dddId}`}>
                    View Movie Details
                  </Button>
                  <Button className="btn-danger" onClick={() => handleSaveUserMovieToGroup(movie)}>
                    Add Movie To Group
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export { CreateGroupForm, UserGroupList, GroupMovieList, UserMovieListForGroup };
