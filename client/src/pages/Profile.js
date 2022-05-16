import { DealbreakerList } from "../components/Dealbreakers";
import { UserMovieList } from "../components/UserMovies";
import { CreateGroupForm, UserGroupList } from "../components/Groups";

import { Container } from "react-bootstrap";

function Profile(props) {
  return (
    <>
      <Container>
        <CreateGroupForm />
        <UserGroupList />
        <UserMovieList />
        <DealbreakerList />
      </Container>
    </>
  );
}
export default Profile;
