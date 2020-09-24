import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import useAuthorization from "../../hooks/useAuthorization";

function HomePage() {
  const history = useHistory();
  useAuthorization();

  const goToCreateImage = () => {
    history.push("/create");
  };

  const logout = () => {
    // Limpa tudo
    window.localStorage.clear();

    // Limpa só um campo.
    // window.localStorage.removeItem("token");
    history.replace("/");
  };

  return (
    <div>
      <Helmet title="Home" />
      <h1>HomePage</h1>
      <button onClick={goToCreateImage}>Crie</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default HomePage;
