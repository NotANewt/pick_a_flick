import { Link } from "react-router-dom";

function Home(props) {
  return (
    <>
      <h1>This is the Home Page</h1>
      <Link as={Link} to="/LoginSignup">
        Login or Signup
      </Link>
    </>
  );
}
export default Home;
