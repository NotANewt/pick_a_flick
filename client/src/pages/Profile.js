import { DealbreakerList } from "../components/Dealbreakers";
import UserMovieList from "../components/UserMovies";

import { Container } from "react-bootstrap";

function Profile(props) {
  return (
    <>
      <Container>
        <DealbreakerList />
        <UserMovieList />
      </Container>
    </>
  );
}
export default Profile;
