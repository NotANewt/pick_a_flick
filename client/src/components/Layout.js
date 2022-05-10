import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <>
      <Header></Header>
      <main>{props.children}</main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
