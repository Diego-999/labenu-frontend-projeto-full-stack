import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [newLogin, setNewLogin] = useState();
  const [newPassword, setNewPassword] = useState();
  const history = useHistory();

  const handleLogin = (event) => {
    setNewLogin(event.target.value);
  };

  const handlePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const goToHome = () => {
    history.replace("/home");
  };

  const goSignUp = () => {
    history.push("/signup");
  };

  const Login = async () => {
    const body = {
      email: newLogin,
      password: newPassword,
    };

    try {
      const result = await axios.post(" http://localhost:4000/login", body);
      console.log(result);
      goToHome();
    } catch (error) {
      alert("Login incorreto, por favor tente novamente");
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet title="LabeView" />
      <h1>HomePage</h1>
      <div>
        <input
          type="text"
          placeholder="Login"
          value={newLogin}
          onChange={handleLogin}
        ></input>
        <input
          type="text"
          placeholder="Password"
          value={newPassword}
          onChange={handlePassword}
        ></input>
      </div>
      <div>
        <button onClick={Login}>Login</button>
        <button onClick={goSignUp}>Cadastre-se</button>
      </div>
    </div>
  );
}

export default LoginPage;
