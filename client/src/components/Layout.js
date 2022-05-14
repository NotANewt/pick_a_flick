import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <>
      <Header></Header>
      <main>
        <br />
        {props.children}
        <br />
      </main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
