import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "../components/LoginPage/LoginPage";
import HomePage from "../components/HomePage/HomePage";
import SignUpPage from "../components/SignUp/SignUpPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
