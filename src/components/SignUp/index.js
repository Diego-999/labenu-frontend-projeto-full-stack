import axios from "axios";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import useForm from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import { Form } from "./styles";

function SignUpPage() {
  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const SigNup = async () => {
    const body = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    if (form.password === form.confPassword) {
      try {
        await axios.post("http://localhost:4000/signup", body);
        alert("Cadastrado com sucesso!");
      } catch (error) {
        alert("Cadastro não realizado!");
        console.log(error);
      }
    } else {
      alert("Senhas não conferem!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    SigNup();
    resetForm();
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Helmet title="Cadastro" />
      <h1>Página de Cadastro</h1>
      <div>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="name"
            value={form.name}
            placeholder="Nick Name"
            onChange={handleInputChange}
            pattern="[A-Za-z]{5,}"
            title="Nick Name com no mínimo 5 letras"
          ></input>
          <input
            type="email"
            required
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleInputChange}
            pattern="[a-z0-9._]+@[a-z0-9]+\.[a-z.]+?$"
            title="Formato de email inválido"
          ></input>
          <input
            type="password"
            required
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleInputChange}
            pattern="[A-Za-z0-9]{6,}"
            title="Senha com no minimo 6 caracteres, letras e números"
          ></input>
          <input
            type="password"
            required
            name="confPassword"
            value={form.confPassword}
            placeholder="Confime a Password"
            onChange={handleInputChange}
            pattern="[A-Za-z0-9]{6,}"
            title="Senha com no minimo 6 caracteres, letras e números"
          ></input>
          <div>
            <input
              type="radio"
              required
              name="role"
              value="normal"
              onChange={handleInputChange}
            ></input>
            normal
            <input
              type="radio"
              required
              name="role"
              value="adm"
              onChange={handleInputChange}
            ></input>
            adm
          </div>

          <div>
            <button type="submit">Cadastrar</button>
            <button onClick={goBack}>Voltar</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
