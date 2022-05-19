import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_GROUP, REMOVE_GROUP, REMOVE_MOVIE_FROM_GROUP, SAVE_USER_MOVIE_TO_GROUP } from "../utils/mutations";
import { QUERY_ME, QUERY_GROUP } from "../utils/queries";

import Auth from "../utils/auth";

const GroupMovieList = (props) => {
  const handleDeleteGroupMovie = (movieId) => {
    props.handleRemoveMovie(movieId);
  };
  return (
    <>
      <Container>
        <h2>{props.movies?.length ? `Group's movies:` : "This group has no movies."}</h2>
        <Row>
          {props.movies?.map((movie) => {
            return (
              <Col lg={3} key={movie.title}>
                <Card border="dark" style={{ marginBottom: "2rem" }}>
                  <Card.Img variant="top" src={movie.posterImage} alt={`The movie poster ${movie.title}`} />
                  <Card.Body className="d-grid gap-2">
                    <Button style={{ marginBottom: "1rem", marginTop: "1rem" }} href={`../Movies/MovieDetails/${movie.dddId}`}>
                      View Movie Details
                    </Button>
                    <Button className="btn-danger" onClick={() => handleDeleteGroupMovie(movie.dddId)}>
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

const GroupUserMovieList = (props) => {
  const handleAddUserMovieToGroup = (movie) => {
    props.handleAddMovie(movie);
  };
  return (
    <>
      <Container>
        <h2>{props.movies?.length ? `Your movies:` : "You have no saved movies to add to this group."}</h2>
        <Row>
          {props.movies?.map((movie) => {
            return (
              <Col lg={3} key={movie.title}>
                <Card border="dark" style={{ marginBottom: "2rem" }}>
                  <Card.Img variant="top" src={movie.posterImage} alt={`The movie poster ${movie.title}`} />
                  <Card.Body className="d-grid gap-2">
                    <Button style={{ marginBottom: "1rem", marginTop: "1rem" }} href={`../Movies/MovieDetails/${movie.dddId}`}>
                      View Movie Details
                    </Button>
                    <Button className="btn-success" onClick={() => handleAddUserMovieToGroup(movie)}>
                      Add Movie
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

// The create a group form on the Profile Page
const CreateGroupForm = (props) => {
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

    props.handleCreateGroup(groupFormData);

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
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title>Create A New Group</Card.Title>
            {/* This is needed for the validation functionality */}
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              {/* show alert if server response is bad */}
              <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                Something went wrong with creating your group.
              </Alert>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="groupname">Name</Form.Label>
                <Form.Control type="text" placeholder="Give your movie group a name!" name="groupname" onChange={handleInputChange} value={groupFormData.groupname} required />
                <Form.Control.Feedback type="invalid">A name is required!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control type="text" placeholder="What's this group all about?" name="description" onChange={handleInputChange} value={groupFormData.description} required />
                <Form.Control.Feedback type="invalid">A description is required!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="joincode">Join Code</Form.Label>
                <Form.Control type="text" placeholder="Create a code to share this group" name="joincode" onChange={handleInputChange} value={groupFormData.joincode} required />
                <Form.Control.Feedback type="invalid">A description join code is required!</Form.Control.Feedback>
              </Form.Group>

              <Button disabled={!(groupFormData.groupname && groupFormData.description)} type="submit" variant="success">
                Create
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

// The users list of groups on the Profile Page
const UserGroupList = (props) => {
  //handle user clicking button to delete a group
  const handleDeleteUserGroup = async (group) => {
    const id = group._id;
    props.handleDeleteGroup(id);
  };

  return (
    <>
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title>{props.myGroups.length ? `My groups:` : "You do not have any groups"}</Card.Title>
            <Row>
              {props.myGroups.map((group) => {
                return (
                  <Col lg={3} key={group._id}>
                    <Card border="dark" style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                      <Card.Body className="d-grid gap-2">
                        <Card.Title className="mx-auto">{group.groupname}</Card.Title>
                        <Card.Text className="mx-auto">{group.description}</Card.Text>
                        <Card.Text className="mx-auto">Join Code: {group.joincode}</Card.Text>
                        <div className="mx-auto">
                          <Button variant="outline-primary" className="mr-4" href={`../GroupPage/${group._id}`}>
                            Go To Group
                          </Button>
                          <Button variant="outline-danger" onClick={() => handleDeleteUserGroup(group)}>
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export { CreateGroupForm, UserGroupList, GroupUserMovieList, GroupMovieList };
