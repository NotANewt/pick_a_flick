import { DealbreakerList } from "../components/Dealbreakers";
import UserMovieList from "../components/UserMovies";
import { CreateGroupForm, UserGroupList } from "../components/Groups";

import { Container } from "react-bootstrap";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_GROUP, REMOVE_GROUP } from "../utils/mutations";
import { QUERY_ME, QUERY_GROUP } from "../utils/queries";

function Profile(props) {
  const [removeGroup, { error: errorRemove }] = useMutation(REMOVE_GROUP);

  const [addGroup, { error }] = useMutation(ADD_GROUP);
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
  const meDBData = dataMe?.me || [];

  // query user group list
  const { loading: loadingGroup, data: dataGroup, refetch: refetchGroup } = useQuery(QUERY_GROUP);
  const groupDBData = dataGroup?.group || [];
  const myGroups = groupDBData?.filter((group) => group.users.includes(meDBData._id) == true);

  // create a group
  const handleProfileCreateGroup = async (groupFormData) => {
    groupFormData.admin = meDBData._id;
    groupFormData.users = meDBData._id;

    const { data } = await addGroup({
      variables: { ...groupFormData },
    });
    refetchGroup();
  };

  // delete a group
  const handleProfileDeleteGroup = async (id) => {
    try {
      const { data } = await removeGroup({
        variables: { id: id },
      });
    } catch (err) {
      console.error(err);
    }
    refetchGroup();
  };

  // delete a movie

  // delete a dealbreaker

  return (
    <>
      <Container>
        <CreateGroupForm handleCreateGroup={handleProfileCreateGroup} />
        <UserGroupList myGroups={myGroups} handleDeleteGroup={handleProfileDeleteGroup} />
        <UserMovieList />
        <DealbreakerList />
      </Container>
    </>
  );
}
export default Profile;
