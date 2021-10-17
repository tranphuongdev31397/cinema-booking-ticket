import "antd/dist/antd.css";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import PageNotFound from "containers/shares/PageNotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { adminRoutes, clientRoutes } from "routes";
import "./App.css";
import ClientLayout from "layouts/ClientLayout";
import AdminLayout from "layouts/AdminLayout";

function App() {
  const renderRoutes = (routes, Layout) => {
    return routes.map((route) => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
          path={path}
          exact={exact}
          component={component}
          isPrivate={isPrivate}
        />
      );
    });
  };
  const renderClientLayout = (routes, Layout) => {
    return routes.map((route) => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
          path={path}
          exact={exact}
          component={component}
          isPrivate={isPrivate}
        />
      );
    });
  };
  return (
    <div className="App">
      {/* <TopBar className="top-bar"/>
      <SideBar className="side-bar"/> */}

      <Router>
        <Switch>
          {renderClientLayout(clientRoutes, ClientLayout)}
          {renderRoutes(adminRoutes, AdminLayout)}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
