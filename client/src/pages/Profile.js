import { DealbreakerList } from "../components/Dealbreakers";
import UserMovieList from "../components/UserMovies";
import CreateGroupForm from "../components/CreateGroupForm";

import { Container } from "react-bootstrap";

function Profile(props) {
  return (
    <>
      <Container>
        <CreateGroupForm />
        <UserMovieList />
        <DealbreakerList />
      </Container>
    </>
  );
}
export default Profile;
