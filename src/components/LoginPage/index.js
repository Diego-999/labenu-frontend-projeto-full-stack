import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [newLogin, setNewLogin] = useState();
  const [newPassword, setNewPassword] = useState();
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      history.replace("/home");
    }
  }, [history]);

  const handleLogin = (event) => {
    setNewLogin(event.target.value);
  };

  const handlePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const goToHome = () => {
    history.replace("/home");
  };

  const goToSignUp = () => {
    history.push("/signup");
  };

  const Login = async () => {
    const body = {
      email: newLogin,
      password: newPassword,
    };

    try {
      const result = await axios.post(" http://localhost:4000/login", body);
      localStorage.setItem("token", result.data.dataUser.accessToken);
      goToHome();
      console.log(result.data.dataUser.accessToken);
    } catch (error) {
      alert("Login incorreto, por favor tente novamente");
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet title="LabeView" />
      <h1>LoginPage</h1>
      <div>
        <input
          type="text"
          placeholder="Login"
          value={newLogin}
          onChange={handleLogin}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={handlePassword}
        ></input>
      </div>
      <div>
        <button onClick={Login}>Login</button>
        <button onClick={goToSignUp}>Cadastre-se</button>
      </div>
    </div>
  );
}

export default LoginPage;
