import { DealbreakerList } from "../components/Dealbreakers";
import UserMovieList from "../components/UserMovies";

import { Container } from "react-bootstrap";

function Profile(props) {
  return (
    <>
      <Container>
        <UserMovieList />
        <DealbreakerList />
      </Container>
    </>
  );
}
export default Profile;
