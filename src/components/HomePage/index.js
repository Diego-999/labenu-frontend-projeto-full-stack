import axios from "axios";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import useAuthorization from "../../hooks/useAuthorization";
import { ContainerImages, StyleImage } from "./styles";
import Modal from "@material-ui/core/Modal";
import { MainModalContainer, ModalContainer, ModalImage } from "./modalStyles";

function HomePage() {
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  useAuthorization();
  const [images, setImages] = useState();
  const [imageById, setImageById] = useState();
  const [open, setOpen] = useState();

  console.log(images);
  console.log(imageById);

  useEffect(() => {
    getImages();
  }, []);

  const goToCreateImage = () => {
    history.push("/create");
  };

  const goToLogin = () => {
    history.replace("/");
  };

  const logout = () => {
    // Limpa tudo
    window.localStorage.clear();

    // Limpa só um campo.
    // window.localStorage.removeItem("token");
    history.replace("/");
  };

  const getImages = async () => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const result = await axios.get("http://localhost:4000/image/", headers);
      setImages(result.data);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.error === "jwt expired") {
        alert("Login expirado");
        logout();
      }
    }
  };

  const getImageById = async (id) => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const result = await axios.get(
        `http://localhost:4000/image/${id}`,
        headers
      );
      setImageById(result.data);
      handleOpen();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //Modal #################################
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // ##################################
  const listImages =
    images &&
    images.map((image) => (
      <div>
        <StyleImage src={image.file} onClick={() => getImageById(image.id)} />
        <p>{image.subtitle}</p>
      </div>
    ));

  return (
    <div>
      <Helmet title="Home" />
      <h1>LabeView</h1>
      <button onClick={goToCreateImage}>Crie</button>
      <button onClick={logout}>Logout</button>
      <hr></hr>
      <h2>Minhas Imagens</h2>
      <ContainerImages>{listImages}</ContainerImages>

      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          <ModalImage src={imageById && imageById.file} />
          <p>{imageById && imageById.subtitle}</p>
        </ModalContainer>
      </Modal>
    </div>
  );
}

export default HomePage;
