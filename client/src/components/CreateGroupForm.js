import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_GROUP } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const CreateGroupForm = () => {
  const { loading: loadingMe, data: dataMe, refetch } = useQuery(QUERY_ME);

  const userData = dataMe?.me || {};

  console.log("UserData in CreateGroupForm", userData);

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
      {/* This is needed for the validation functionality above */}
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
    </>
  );
};

export default CreateGroupForm;
