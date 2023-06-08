import Content from "./Content/Content";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default Layout;
