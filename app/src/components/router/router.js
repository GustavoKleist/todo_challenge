//REACT
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//BUSINESS
import { isAuthenticated } from "../authorization/authorizationBusiness";
//COMPONENTS
import HomePage from "../home/homePage";
import ProjectPage from "../project/projectPage";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Router>
    <main>
      <Switch>
        <PrivateRoute path="/project" exact component={() => <ProjectPage />} />
        <Route path="/" exact component={() => <HomePage />} />
      </Switch>
    </main>
  </Router>
);

export default Routes;
