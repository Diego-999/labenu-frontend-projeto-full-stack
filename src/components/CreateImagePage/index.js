import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import useAuthorization from "../../hooks/useAuthorization";
import useForm from "../../hooks/useForm";
import { Form } from "./styles";

function CreateImagePage() {
  const history = useHistory();
  const [profile, setProfile] = useState();
  const token = window.localStorage.getItem("token");

  useAuthorization();
  useEffect(() => {
    getProfile();
  }, [token]);

  console.log(profile);

  const { form, onChange, resetForm } = useForm({
    subtitle: "",
    author: "",
    date: "",
    file: "",
    tags: "",
    collection: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const logout = () => {
    // Limpa tudo
    window.localStorage.clear();

    // Limpa só um campo.
    // window.localStorage.removeItem("token");
    history.replace("/");
  };

  const CreateImage = async () => {
    const arrayTags = form.tags.split(",");
    console.log(arrayTags);

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    const body = {
      subtitle: form.subtitle,
      author: form.author,
      date: form.date,
      file: form.file,
      tags: arrayTags,
      collection: form.collection,
    };

    try {
      await axios.post("http://localhost:4000/image", body, headers);
      alert("Imagem cadastrada com sucesso!");
    } catch (error) {
      alert("Cadastro não realizado!");
      console.log(error);
    }
  };

  const getProfile = async () => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const result = await axios.get(`http://localhost:4000/profile`, headers);
      setProfile(result.data);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.error === "jwt expired") {
        alert("Login expirado");
        logout();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    CreateImage();
    resetForm();
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Helmet title="Cadastre sua Imagem" />
      <h1>Página de Cadastro de Imagem</h1>
      <div>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="subtitle"
            value={form.subtitle}
            placeholder="Legenda"
            onChange={handleInputChange}
            title="Legenda da imagem"
          ></input>
          <input
            type="text"
            required
            name="author"
            value={form.author}
            placeholder="Criador"
            onChange={handleInputChange}
            title="Criador da imagem"
          ></input>
          <input
            type="text"
            required
            name="date"
            value={form.date}
            placeholder="Data"
            onChange={handleInputChange}
            title="Digite a data"
          ></input>
          <input
            type="text"
            required
            name="file"
            value={form.file}
            placeholder="Url da Imagem"
            onChange={handleInputChange}
            title="Digite a url da imagem"
          ></input>
          <input
            type="text"
            required
            name="tags"
            value={form.tags}
            placeholder="Hashtags separadas por vírgula"
            onChange={handleInputChange}
            title="Digite as hashtags separadas por vírgula"
          ></input>
          <input
            type="text"
            required
            name="collection"
            value={form.collection}
            placeholder="Coleção"
            onChange={handleInputChange}
            title="Digite uma coleção para sua imagem"
          ></input>

          <div>
            <button type="submit">Cadastrar Imagem</button>
            <button onClick={goBack}>Voltar</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateImagePage;
